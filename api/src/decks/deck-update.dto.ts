import { IsString, IsOptional } from "class-validator";

export class UpdateDeckDto {
    @IsOptional()
    @IsString()
    title?: string;
  
    @IsOptional()
    @IsString()
    image?: string;
  }