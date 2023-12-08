import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { ILike, Repository } from 'typeorm';
import { CreateCardDTO } from './card-create.dto';
import { CardResponseDTO } from './card-response.dto';
import { UpdateCardDto } from './card-update.dto';

@Injectable()
export class CardsService {
    constructor(
        @InjectRepository(Card)
        private cardRepo: Repository<Card>,
    ) { }

    async create(createCardDto: CreateCardDTO, deckId: string): Promise<CardResponseDTO> {
        const card = await this.cardRepo.create({ ...createCardDto, deckId });
        return await this.cardRepo.save(card);
    }

    async findAll(limit: number, offset: number, deckId: string, search?: string): Promise<Card[]> {
        const content = search ? ILike(`%${search}%`) : undefined;
        const relations = ["deck"];

        const comments = await this.cardRepo.find({
            take: limit,
            skip: offset,
            where: [
                {
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

    async findOne(deckId: string, id: string): Promise<Card | null> {
        return await this.cardRepo.findOneBy({ deckId, id });
    }

    async update(deckId: string, id: string, updateCardDto: UpdateCardDto): Promise<Card | null> {
        const card = await this.cardRepo.preload({ id, deckId, ...updateCardDto });
        if (!card) {
            return null;
        }
        card.updatedAt = new Date();
        return await this.cardRepo.save(card);
    }

    async remove(deckId: string, id: string): Promise<Card | null> {
        const deck = await this.findOne(deckId, id);
        if (!deck) {
            return null;
        }
        return this.cardRepo.remove(deck);
    }
}
