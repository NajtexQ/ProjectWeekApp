import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { AuthGuard } from '../auth/auth.guard';
import { UserUpdateDto } from './user-update.dto';
import { transporter } from 'src/MailService';

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

    @Post('send-email')
    async sendEmail(@Body() data: { email: string }) {

        console.log("Sending email to: " + data.email);

        console.log("Transporter created");

        let info = await transporter.sendMail({
            from: '"The Wall" <no-reply@example.com>', // sender address
            to: "gaming.najt@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        },
            (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            }
        );

        console.log("Info: " + info);

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
    async delete(@Param('id') id: number, @Req() req: Request) {
        const cookie = req.cookies['token'];
        const user = this.jwtService.verify(cookie);

        const currentUser = await this.userService.findOne(id);

        if (user.id !== currentUser.id) {
            throw new BadRequestException('You can only delete your own account');
        }

        return await this.userService.delete(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: UserUpdateDto, @Req() req: Request) {

        const cookie = req.cookies['token'];
        const user = await this.jwtService.verifyAsync(cookie);

        const currentUser = await this.userService.findOne(id);

        if (currentUser.id !== user.id) {
            throw new BadRequestException('You are not allowed to update this user');
        }

        if (data.password) {

            // Compare current password with the one in the database
            const isPasswordCorrect = bcrypt.compare(data.currentPassword, currentUser.password);

            if (!isPasswordCorrect) {
                throw new BadRequestException('Current password is incorrect');
            }

            if (data.password !== data.passwordConfirm) {
                throw new BadRequestException('Passwords do not match');
            }

        }

        const newData = {
            firstName: data.firstName ? data.firstName : currentUser.firstName,
            lastName: data.lastName ? data.lastName : currentUser.lastName,
            email: data.email ? data.email : currentUser.email,
            password: data.password ? await bcrypt.hash(data.password, 10) : currentUser.password,
        }

        return this.userService.update(id, newData);
    }
}
