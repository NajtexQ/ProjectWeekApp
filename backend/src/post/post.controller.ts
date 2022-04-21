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
        private readonly jwtService: JwtService,
    ) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('image', {
        storage: storage,
    }))
    async create(@Body() data: CreatePostDto, @Req() req: Request, @UploadedFile() file) {

        const cookie = req.cookies['token'];
        const user = await this.jwtService.verifyAsync(cookie);

        // Save file as png or jpg
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            throw new BadRequestException('Only .png or .jpg files are allowed');
        }

        return this.postService.create({
            ...data,
            user: {
                id: user.id,
            },
            image: file.filename,
            imageOriginalName: file.originalname,
        });

    }

    @Get('all')
    async getAll() {
        return this.postService.findAll();
    }

    @Get('image/:image')
    async getImage(@Param('image') image: string, @Res() res: Response) {
        return res.sendFile(image, { root: './files' });
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

        const post = await this.postService.findOne(id);

        if (post.user.id !== user.id) {
            throw new UnauthorizedException('You are not allowed to update this post');
        }

        return this.postService.update(id, data);
    }
}

