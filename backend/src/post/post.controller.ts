import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { CreatePostDto } from './create-post.dto';
import { UpdatePostDto } from './update-post.dto';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('post')
export class PostController {

    constructor(
        private readonly postService: PostService,
        private readonly jwtService: JwtService,
    ) { }

    @Post('create')
    async create(@Body() data: CreatePostDto, @Req() req: Request) {

        const cookie = req.cookies['token'];
        const user = await this.jwtService.verifyAsync(cookie);

        return this.postService.create({
            ...data,
            user: {
                id: user.id,
            }
        });

    }

    @Get('all')
    async getAll() {
        return this.postService.findAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        return this.postService.findOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.postService.delete(id);
    }

    @Put(':id')
    async update
        (
            @Param('id') id: number,
            @Body() data: UpdatePostDto,
            @Req() req: Request
        ) {

        const cookie = req.cookies['token'];
        const user = await this.jwtService.verifyAsync(cookie);

        const post =  await this.postService.findOne(id);

        if (post.user.id !== user.id) {
            throw new UnauthorizedException('You are not allowed to update this post');
        }

        return this.postService.update(id, data);
    }
}

