import { CardResponseDTO } from "./card-response.dto";

export class FindCardsResponseDTO {
  limit: number;
  offset: number;
  search?: string;
  data: CardResponseDTO[];
}