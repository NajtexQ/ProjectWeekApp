import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUser } from './auth.entity';
import { NonUser } from '../user/user.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(AuthUser)
        private readonly authRepository: Repository<AuthUser>,
        @InjectRepository(NonUser)
        private readonly userRepository: Repository<NonUser>,
    ) { }

    createAuth(auth): Promise<AuthUser> {
        return this.authRepository.save(auth);
    }

    deleteAuth(id) {
        return this.authRepository.delete(id);
    }

    async updateAuth(id: number, auth) {
        return this.authRepository.update(id, auth);
    }

    async findOneByUuid(uuid): Promise<AuthUser> {
        return this.authRepository.findOne({ where: { uuid } });
    }

    createUser(user): Promise<NonUser> {
        return this.userRepository.save(user);
    }

    deleteUser(id) {
        return this.userRepository.delete(id);
    }

    findOneByEmail(email): Promise<NonUser> {
        return this.userRepository.findOne({ where: { email } });
    }

    findOneById(id): Promise<NonUser> {
        return this.userRepository.findOne({ where: { id } });
    }
}
