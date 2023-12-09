import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { DecksService } from 'src/decks/decks.service';
import { Deck } from 'src/decks/deck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Deck])],
  controllers: [CardsController],
  providers: [CardsService, DecksService],
})

export class CardsModule {}
