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
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { CardResponseDTO } from './card-response.dto';
import { CardsService } from './cards.service';
import { CreateCardDTO } from './card-create.dto';

type CardResponseWithPagination = {
    search?: string;
    pagination: {
        limit: number;
        offset: number;
    };
    data: CardResponseDTO[];
};

@UseGuards(JwtAuthGuard)
@Controller("decks/:deckId/cards")
export class CardsController {
    constructor(private readonly cardsService: CardsService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(
        @Query('limit') limit: number = 10,
        @Query('offset') offset: number = 0,
        @Query('search') search: string,
        @UserId() userId: number,
    ): Promise<CardResponseWithPagination> {
        const posts = await this.cardsService.findAll(limit, offset, userId, search);
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

    @Post()
    async create(
        @Body() createCardDto: CreateCardDTO,
        @UserId() deckId: number,
    ): Promise<CreateCardDTO> {
        const card = await this.cardsService.create(createCardDto, userId);
        delete card.userId;
        delete card.updatedAt;
        delete card.numberOfCards;
        return card;
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string
    ): Promise<CardResponseDTO> {
        const card = await this.cardsService.findOne(id);
        if (!card) {
            throw new NotFoundException(`Card with ID ${id} not found`);
        }
        delete card.userId;
        return card;
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCardDto: UpdateCardDto,
        @UserId() userId: number,
    ): Promise<CardResponseDTO> {
        let card = await this.cardsService.findOne(id);
        if (!card) {
            throw new NotFoundException(`Card with ID ${id} not found`);
        } else if (card.userId !== userId) {
            throw new ForbiddenException("Don't try to hack other people's stuff");
        }
        card = await this.cardsService.update(id, updateCardDto);
        delete card.userId;
        return card;
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
    ): Promise<{ message: string; cardId: string }> {
        const card = await this.cardsService.remove(id);
        if (!card) {
            throw new NotFoundException(`Card with ID ${id} not found`);
        }
        return { message: "Card deleted", cardId: id };
    }
}
