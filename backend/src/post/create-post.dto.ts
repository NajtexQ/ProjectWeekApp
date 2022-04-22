import { IsString, IsEmail, IsNotEmpty, IsNumberString, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreatePostDto {

    @IsOptional()
    @IsString()
    @MaxLength(30)
    title?: string;

    @IsString()
    @MaxLength(1500)
    content: string;

}