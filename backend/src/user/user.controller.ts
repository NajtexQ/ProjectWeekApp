import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) {}

    @Get('profile')
    profile(): string {
        return 'Timotej Kompare';
    }

    @Post('create')
    async create(@Body() data: RegisterDto){
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
    find(@Param('id') id: number){
        return this.userService.findOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: number){
        return this.userService.delete(id);
    }

    @Post(':id')
    async update(@Param('id') id: number, @Body() data){
        return await this.userService.update(id, data);
    }
}
