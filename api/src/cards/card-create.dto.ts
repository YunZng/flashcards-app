import { IsNotEmpty, IsString } from "class-validator";

export class CreateCardDTO {
    @IsString()
    @IsNotEmpty({ message: 'Title cannot be empty' })
    front: string;

    @IsString()
    @IsNotEmpty({ message: 'Title cannot be empty' })
    back: string;
}