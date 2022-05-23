import { BadRequestException, Body, Controller, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { RegisterDto } from 'src/user/register.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {}

    @Post('login')
    async login(
        @Body() data: LoginDto,
        @Res({passthrough: true}) res: Response,
        ) {
        const user = await this.userService.findOneByEmail(data.email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!await bcrypt.compare(data.password, user.password)) {
            throw new BadRequestException('Invalid password');
        }

        const jwt = await this.jwtService.signAsync({
            id: user.id
        });

        res.cookie('token', jwt, {httpOnly: true});

    }

    @Post('register')
    async register(@Body() data: RegisterDto){

        if (data.password !== data.passwordConfirm) {
            throw new BadRequestException('Passwords do not match');
        }

        const userCheck = await this.userService.findOneByEmail(data.email) || await this.authService.findOneByEmail(data.email);

        if (userCheck) {
            throw new BadRequestException('This email is already in use');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.authService.createUser({
            ...data,
            password: hashedPassword,
        });

        this.authService.createAuth({
            userId: user.id,
            validUntil: new Date(Date.now() + 3600 * 1000),
            uuid: uuidv4(),
        });

        return user;
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) res: Response) {
        
        res.clearCookie('token');

        return {
            message: 'Logged out',
        }
    }

    @Post('verify:uuid')
    async verify(@Param('uuid') uuid: string) {

        const userAuth = await this.authService.findOneByUuid(uuid);

        if (!userAuth) {
            throw new NotFoundException('Verification link not found');
        }

        if (userAuth.validUntil < new Date()) {
            throw new BadRequestException('Verification link expired');
        }

        const user = await this.authService.findOneById(userAuth.userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        this.authService.deleteUser(user.id);
        this.authService.deleteAuth(userAuth.id);

        return this.userService.create(user);
    }

    @Post('renew/:uuid')
    async renew(@Param('uuid') uuid: string) {
            
            const userAuth = await this.authService.findOneByUuid(uuid);
    
            if (!userAuth) {
                throw new NotFoundException('Verification link not found');
            }
    
            const user = await this.authService.findOneById(userAuth.userId);
    
            const userAuthRenew = this.authService.updateAuth(userAuth.id, {
                uuid: uuidv4(),
                expires: new Date(Date.now() + 10 * 60 * 1000),
            });
    
            return user;
        }

}
