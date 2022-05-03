import { IsString, IsEmail, IsNotEmpty, IsNumberString, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreatePostDto {

    @IsOptional()
    @IsString()
    @MaxLength(30)
    title?: string;

    @IsString()
    // To mess with people who try to cheat
    @MaxLength(1050)
    content: string;

}