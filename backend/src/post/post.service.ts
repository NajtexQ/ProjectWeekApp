import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/like/like.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './create-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository (Post)
        private readonly postRepository: Repository<Post>,
    ) {}

    create(data): Promise<Post> {
        return this.postRepository.save(data);
    }

    findAll(): Promise<Post[]> {

        return this.postRepository.find(
            {
                relations: ['likes'],
            }
        );
    }

    findOne(id: number): Promise<Post> {
        return this.postRepository.findOne(id);
    }

    delete(id: number){
        return this.postRepository.delete(id);
    }

    async update(id: number, data) {
        await this.postRepository.update(id, data);
        return this.postRepository.findOne(id);
    }
}