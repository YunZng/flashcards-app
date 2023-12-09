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
import { UpdateCardDto } from './card-update.dto';
import { DeckOwnershipGuard } from 'src/guard/deck-owner.guard';
import { CardOwnershipGuard } from 'src/guard/card-owner.guard';
import { FindCardsQueryDTO } from './find-cards-query.dto';
import { FindCardsResponseDTO } from './find-cards-response.dto';

type CardResponseWithPagination = {
    search?: string;
    pagination: {
        limit: number;
        offset: number;
    };
    data: CardResponseDTO[];
};

@UseGuards(JwtAuthGuard, DeckOwnershipGuard)
@Controller("decks/:id/cards")
export class CardsController {
    constructor(private readonly cardsService: CardsService) { }

    @Get()
    async findAll(
        @Query() findCardsQuery: FindCardsQueryDTO,
        @Param('id') deckId: string,
        @UserId() userId: number,
    ): Promise<FindCardsResponseDTO> {
        const { limit, offset, search } = findCardsQuery;
        const cards = await this.cardsService.findAll(limit, offset, deckId, userId, search);
        return {
            limit,
            offset,
            search,
            data: cards.map((card) => {
                delete card.deck, card.userId, card.user;
                return card;
            }),
        };
    }

    @Post()
    async create(
        @Body() createCardDto: CreateCardDTO,
        @Param("id") deckId: string,
        @UserId() userId: number,
    ): Promise<CreateCardDTO> {
        const card = await this.cardsService.create(createCardDto, deckId, userId);
        return card;
    }

    @Get(':cardId')
    async findOne(
        @Param('id') deckId: string,
        @Param('cardId') id: string,
        @UserId() userId: number
    ): Promise<CardResponseDTO> {
        const card = await this.cardsService.findOne(deckId, id, userId);
        if (!card) {
            throw new NotFoundException(`Card with ID ${id} not found`);
        }
        return card;
    }

    @UseGuards(CardOwnershipGuard)
    @Patch(':cardId')
    async update(
        @Param('cardId') id: string,
        @Param('id') deckId: string,
        @Body() updateCardDto: UpdateCardDto,
        @UserId() userId: number,
    ): Promise<CardResponseDTO> {
        let card = await this.cardsService.findOne(deckId, id, userId);
        if (!card) {
            throw new NotFoundException(`Card with ID ${id} not found`);
        }
        card = await this.cardsService.update(deckId, id, updateCardDto);
        return card;
    }
    @UseGuards(CardOwnershipGuard)
    @Delete(':cardId')
    async remove(
        @Param('id') deckId: string,
        @Param('cardId') id: string,
        @UserId() userId: number,
    ): Promise<{ message: string; cardId: string }> {
        const card = await this.cardsService.remove(deckId, id, userId);
        if (!card) {
            throw new NotFoundException(`Card with ID ${id} not found`);
        }
        return { message: "Card deleted", cardId: id };
    }
}
