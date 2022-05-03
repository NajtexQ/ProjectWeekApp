import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Req, Res, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { CreatePostDto } from './create-post.dto';
import { UpdatePostDto } from './update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { registerDecorator } from 'class-validator';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as mime from 'mime';
import * as crypto from 'crypto';
import path, { resolve } from 'path';
import { existsSync, unlinkSync } from 'fs';
import { LikeService } from 'src/like/like.service';

var storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('post')
export class PostController {

    constructor(
        private readonly postService: PostService,
        private readonly likeService: LikeService,
        private readonly jwtService: JwtService,
    ) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('image', { storage }))

    async create(@UploadedFile() file, @Body() data: CreatePostDto, @Req() req: Request) {

        const cookie = req.cookies['token'];
        const user = await this.jwtService.verifyAsync(cookie);

        // Save file as png or jpg
        if (file) {
            if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
                throw new BadRequestException('Only .png or .jpg files are allowed');
            }
        }

        return this.postService.create({
            ...data,
            user: {
                id: user.id,
            },
            image: file ? file.filename : "no-image.png",
            imageOriginalName: file ? file.originalname : "",
        });

    }

    @Get('all')
    async getAll(@Req() req: Request) {

        const cookie = req.cookies['token'];
        const user = await this.jwtService.verifyAsync(cookie);

        const allPosts = await this.postService.findAll();

        // TODO: Implement likes count for each post

        return await Promise.all(allPosts.map(async post => {
            return {
                ...post,
                likes: await this.likeService.countLikes(post.id),
                likedByUser: await this.likeService.userLikedPost(user.id ,post.id),
            }
        }));
    }

    @Get('image/:image')
    async getImage(@Param('image') image: string, @Res() res: Response) {

        // Check if image exist in folder
        if (existsSync(`./files/${image}`)) {
            res.sendFile(resolve(`./files/${image}`));
        } else {
            res.sendFile(resolve(`./files/no-image.png`));
        }
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {

        const data = await this.postService.findOne(id);
        const likes = await this.likeService.findAllByPost(id);

        return {
            ...data,
            likes: likes.length,
        };
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Req() req: Request) {

        // Check if user is allowed to delete post
        const cookie = req.cookies['token'];
        const data = await this.jwtService.verifyAsync(cookie);

        const post = await this.postService.findOne(id);

        if (post.user.id !== data.id) {
            throw new UnauthorizedException('You are not allowed to delete this post');
        }
        else {
            // Delete image from folder
            if (post.image) {
                if (post.image !== 'no-image.png') {
                    unlinkSync(`./files/${post.image}`);
                }
            }
            return this.postService.delete(id);
        }
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('image', { storage }))
    async update
        (
            @Param('id') id: number,
            @Body() data: UpdatePostDto,
            @Req() req: Request,
            @UploadedFile() file,
    ) {

        const cookie = req.cookies['token'];
        const user = await this.jwtService.verifyAsync(cookie);

        const post = await this.postService.findOne(id);

        if (post.user.id !== user.id) {
            throw new UnauthorizedException('You are not allowed to update this post');
        }

        if (file) {
            if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
                throw new BadRequestException('Only .png or .jpg files are allowed');
            }
            else {
                // Delete old image
                if (post.image) {
                    if (post.image !== 'no-image.png') {
                        unlinkSync(`./files/${post.image}`);
                    }
                }
            }
        }

        return this.postService.update(id, {
            ...data,
            image: file ? file.filename : post.image,
        });
    }
}

