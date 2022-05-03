import { Exclude } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, IsNumberString, IsNumber, MinLength, IsOptional } from 'class-validator';

export class UserUpdateDto {

    @IsString()
    @IsNotEmpty()
    currentPassword: string;

    @IsString()
    @IsOptional()
    @MinLength(5)
    password?: string;

    @IsString()
    @IsOptional()
    @MinLength(5)
    passwordConfirm?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;
}