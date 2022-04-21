import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('profile')
    async profile(@Req() req: Request) {

        const cookie = req.cookies['token'];
        const data = await this.jwtService.verifyAsync(cookie);

        return this.userService.findOne(data.id);
        
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
