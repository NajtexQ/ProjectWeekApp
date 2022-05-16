import { BadRequestException, Body, Controller, NotFoundException, Post, Res } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { RegisterDto } from 'src/user/register.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    @Post('login')
    async login(
        @Body() data: LoginDto,
        @Res({passthrough: true}) res: Response,
        ) {
        const user = await this.userService.findOneByEmail(data.email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!await bcrypt.compare(data.password, user.password)) {
            throw new BadRequestException('Invalid password');
        }

        const jwt = await this.jwtService.signAsync({
            id: user.id
        });

        res.cookie('token', jwt, {httpOnly: true});

    }

    @Post('register')
    async register(@Body() data: RegisterDto){
        if (data.password !== data.passwordConfirm) {
            throw new BadRequestException('Passwords do not match');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        return this.userService.create({
            ...data,
            password: hashedPassword,
        });
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) res: Response) {
        
        res.clearCookie('token');

        return {
            message: 'Logged out',
        }
    }

}
