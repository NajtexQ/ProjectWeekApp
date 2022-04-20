import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    @Get('profile')
    async profile(@Req() req: Request) {

        const cookie = req.cookies['token'];
        const data = await this.jwtService.verifyAsync(cookie);
        
    }

    @Post('create')
    async create(@Body() data: RegisterDto) {
        if (data.password !== data.passwordConfirm) {
            throw new BadRequestException('Passwords do not match');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        return this.userService.create({
            ...data,
            password: hashedPassword,
        });
    }

    @Get('all')
    all() {
        return this.userService.findAll();
    }

    @Get(':id')
    find(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data) {
        return await this.userService.update(id, data);
    }
}
