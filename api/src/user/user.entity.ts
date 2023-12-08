import { Deck } from 'src/decks/deck.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayName: string;

  @Column({ nullable: true })
  avatar: string;
  
  @OneToMany(() => Deck, (deck) => deck.user)
  decks: Deck[];
}
