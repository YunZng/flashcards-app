import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CardsService } from 'src/cards/cards.service';
import { RequestWithUser } from 'src/decorators/user-id.decorator';


@Injectable()
export class CardOwnershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private cardService: CardsService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = (request as RequestWithUser).user;
    const userId = user.userId;
    const deckId = request.params.id;
    const id = request.params.cardId;

    const card = await this.cardService.findOne(deckId, id, userId);
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return card.userId == userId;
  }
} 