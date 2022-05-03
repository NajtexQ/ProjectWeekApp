import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { LikeService } from './like.service';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('like')
export class LikeController {
    
    constructor(
        private readonly likeService: LikeService,
        private readonly jwtService: JwtService,
    ) { }

    @Post('add/:postId')
    async add(@Req() req: Request, @Param('postId') postId: number) {

        const cookie = req.cookies['token'];
        const user = await this.jwtService.verifyAsync(cookie);

        // Check if user already liked the post
        const isLiked = await this.likeService.userLikedPost(user.id, postId);

        if (isLiked) {
            return {
                message: 'You already liked this post',
            };
        }

        return this.likeService.add({
            user: {
                id: user.id,
            },
            post: {
                id: postId,
            },
        });
    }

    @Delete('delete/:postId')
    async delete(@Req() req: Request, @Param('postId') postId: number) {
        const cookie = req.cookies['token'];
        const user = await this.jwtService.verifyAsync(cookie);

        return this.likeService.delete(user.id, postId);
    }

    @Get('all')
    async getAll() {
        return this.likeService.getAll();
    }
}
