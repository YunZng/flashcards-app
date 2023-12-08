import { Injectable } from '@nestjs/common';
import { Deck } from './deck.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeckDto } from './deck-create.dto';
import { UpdateDeckDto } from './deck-update.dto';

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck)
    private deckRepo: Repository<Deck>,
  ) { }

  async create(createDeckDto: CreateDeckDto, userId: number): Promise<Deck> {
    const deck = await this.deckRepo.create({ ...createDeckDto, userId });
    return await this.deckRepo.save(deck);
  }

  async findAll(limit: number, offset: number, userId: number, search?: string): Promise<Deck[]> {
    const queryBuilder = this.deckRepo.createQueryBuilder('decks')
    queryBuilder.where(`decks.userId =:userId`, {
      userId,
    });
    if (search) {
      queryBuilder.andWhere(`decks.title ILIKE :search`, {
        search: `%${search}%`,
      });
    }
    return await queryBuilder.limit(limit)
      .offset(offset)
      .orderBy('decks.createdAt', 'DESC')
      .getMany();
  }

  async findOne(id: string): Promise<Deck | null> {
    return await this.deckRepo.findOneBy({ id });
  }

  async update(id: string, updateDeckDto: UpdateDeckDto): Promise<Deck | null> {
    const deck = await this.deckRepo.preload({ id, ...updateDeckDto });
    if (!deck) {
      return null;
    }
    deck.updatedAt = new Date();
    return await this.deckRepo.save(deck);
  }

  async remove(id: string): Promise<Deck | null> {
    const deck = await this.findOne(id);
    if (!deck) {
      return null;
    }
    return this.deckRepo.remove(deck);
  }
}
