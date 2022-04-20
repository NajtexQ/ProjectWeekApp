import { BadRequestException, Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
    ) {}

    @Post('login')
    async login(@Body() data: LoginDto) {
        const user = await this.userService.findOneByEmail(data.email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!await bcrypt.compare(data.password, user.password)) {
            throw new BadRequestException('Invalid password');
        }

        return user;

    }

    @Post('register')
    async register() {
        return {
            token: 'secret-token',
        };
    }

    @Post('logout')
    async logout() {
        return {
            token: 'secret-token',
        };
    }

}
