import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DecksService } from 'src/decks/decks.service';

import { RequestWithUser } from 'src/decorators/user-id.decorator';


@Injectable()
export class DeckOwnershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private deckService: DecksService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Get the user id from the request object
    const user = (request as RequestWithUser).user;
    const userId = user.userId;
    // The JWT strategy will throw an error if it fails to validate the token

    // Get the deck id from the request params
    const deckId = request.params.id;

    const deck = await this.deckService.findOne(deckId);

    // If deck does not exist
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${deckId} not found`);
    }

    // Check if the deck belongs to the user
    return deck.userId == userId;
  }
} 