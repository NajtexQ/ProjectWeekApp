import { IsString, IsEmail, IsNotEmpty, IsNumberString, IsNumber, IsOptional, MaxLength, IsPort } from 'class-validator';

export class UpdatePostDto {

    @IsOptional()
    @IsString()
    @MaxLength(30)
    title?: string;

    @IsOptional()
    @IsString()
    @MaxLength(1500)
    content?: string;
}