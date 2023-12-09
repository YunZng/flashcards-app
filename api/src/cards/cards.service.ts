import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { ILike, Repository } from 'typeorm';
import { CreateCardDTO } from './card-create.dto';
import { CardResponseDTO } from './card-response.dto';
import { UpdateCardDto } from './card-update.dto';
import { DecksService } from 'src/decks/decks.service';

@Injectable()
export class CardsService {
    constructor(
        @InjectRepository(Card)
        private cardRepo: Repository<Card>,
        private readonly decksService: DecksService
    ) { }

    async create(createCardDto: CreateCardDTO, deckId: string, userId: number): Promise<CardResponseDTO> {
        const card = await this.cardRepo.create({ ...createCardDto, deckId, userId });
        await this.decksService.changeCardCount(deckId, 1);
        return await this.cardRepo.save(card);
    }

    async findAll(limit: number, offset: number, deckId: string, userId: number, search?: string): Promise<Card[]> {
        const content = search ? ILike(`%${search}%`) : undefined;
        const relations = ["deck"];

        const comments = await this.cardRepo.find({
            take: limit,
            skip: offset,
            where: [
                {
                    userId,
                    deckId,
                    front: content,
                    back: content,
                },
            ],
            order: {
                createdAt: "DESC",
            },
            relations,
        });

        return comments;
    }

    async findOne(deckId: string, id: string, userId: number): Promise<Card | null> {
        return await this.cardRepo.findOneBy({ deckId, id, userId });
    }

    async update(deckId: string, id: string, updateCardDto: UpdateCardDto): Promise<Card | null> {
        const card = await this.cardRepo.preload({ id, deckId, ...updateCardDto });
        if (!card) {
            return null;
        }
        card.updatedAt = new Date();
        return await this.cardRepo.save(card);
    }

    async remove(deckId: string, id: string, userId: number): Promise<Card | null> {
        const deck = await this.findOne(deckId, id, userId);
        if (!deck) {
            return null;
        }
        await this.decksService.changeCardCount(deckId, -1);
        return this.cardRepo.remove(deck);
    }
}
