import { IsString, IsEmail, IsNotEmpty, IsNumberString, IsNumber, MinLength } from 'class-validator';

export class UserUpdateDto {

    @MinLength(6)
    password: string;

    @IsEmail()
    email: string;

    firstName?: string;
    lastName?: string;
}