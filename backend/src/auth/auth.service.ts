import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUser } from './auth.entity';
import { NonUser } from './non-users.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(AuthUser)
        private readonly authRepository: Repository<AuthUser>,
        @InjectRepository(NonUser)
        private readonly nonUserRepository: Repository<NonUser>,
    ) { }

    

}
