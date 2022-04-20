import { IsString, IsEmail, IsNotEmpty, IsNumberString, IsNumber, MinLength, IsOptional } from 'class-validator';

export class UserUpdateDto {

    @IsOptional()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsEmail()
    email: string;

    firstName?: string;
    lastName?: string;
}