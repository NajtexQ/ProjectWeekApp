import { BadRequestException, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { CreatePostDto } from './create-post.dto';

@Controller('post')
export class PostController {

    constructor(
        private readonly postService: PostService,
        private readonly jwtService: JwtService,
    ) {}

    @UseGuards(AuthGuard)
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

}
