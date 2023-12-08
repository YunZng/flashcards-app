import { Deck } from 'src/decks/deck.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Card {
    
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    
    @Column()
    front: string;

    @Column()
    back: string;
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ManyToOne(() => Deck, (deck) => deck.cards)
    @JoinColumn({ name: 'deckId' })
    deckId: string;
}
