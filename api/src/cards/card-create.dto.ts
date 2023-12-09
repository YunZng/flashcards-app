import { IsNotEmpty, IsString } from "class-validator";

export class CreateCardDTO {
    @IsString()
    @IsNotEmpty({ message: 'Front cannot be empty' })
    front: string;

    @IsString()
    @IsNotEmpty({ message: 'Back cannot be empty' })
    back: string;
}