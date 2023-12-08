import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  ForbiddenException,
  Query,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './deck-create.dto';
import { UpdateDeckDto } from './deck-update.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { DeckResponseDTO } from './deck-response.dto';
import { UserId } from 'src/decorators/user-id.decorator';
import { DeckOwnershipGuard } from 'src/guard/deck-owner.guard';

type DeckResponseWithPagination = {
  search?: string;
  pagination: {
    limit: number;
    offset: number;
  };
  data: DeckResponseDTO[];
};

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('search') search: string,
    @UserId() userId: number,
  ): Promise<DeckResponseWithPagination> {
    const posts = await this.decksService.findAll(limit, offset, userId, search);
    return {
      search,
      data: posts.map((post) => {
        delete post.userId;
        return post;
      }),
      pagination: {
        limit,
        offset,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createDeckDto: CreateDeckDto,
    @UserId() userId: number,
  ): Promise<CreateDeckDto> {
    const deck = await this.decksService.create(createDeckDto, userId);
    delete deck.userId;
    delete deck.updatedAt;
    delete deck.numberOfCards;
    return deck;
  }

  @UseGuards(JwtAuthGuard, DeckOwnershipGuard)
  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<DeckResponseDTO> {
    const deck = await this.decksService.findOne(id);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${id} not found`);
    }
    delete deck.userId;
    return deck;
  }

  @UseGuards(JwtAuthGuard, DeckOwnershipGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDeckDto: UpdateDeckDto,
    @UserId() userId: number,
  ): Promise<DeckResponseDTO> {
    let deck = await this.decksService.findOne(id);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${id} not found`);
    } else if (deck.userId !== userId) {
      throw new ForbiddenException("Don't try to hack other people's stuff");
    }
    deck = await this.decksService.update(id, updateDeckDto);
    delete deck.userId;
    return deck;
  }

  @UseGuards(JwtAuthGuard, DeckOwnershipGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<{ message: string; deckId: string}> {
    const deck = await this.decksService.remove(id);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${id} not found`);
    }
    return {message: "Deck deleted", deckId: id};
  }
}
