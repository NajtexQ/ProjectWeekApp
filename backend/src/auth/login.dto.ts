import { IsString, IsEmail, IsNotEmpty, IsNumberString, IsNumber } from 'class-validator';

export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}