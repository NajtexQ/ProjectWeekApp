import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';

@Injectable()
export class LikeService {

    constructor(
        @InjectRepository(Like)
        private readonly likeRepository: Repository<Like>
    ) {}

    add(data): Promise<Like> {
        return this.likeRepository.save(data);
    }

    delete(userId, postId){
        return this.likeRepository.delete({
            user: {
                id: userId,
            },
            post: {
                id: postId,
            },
        });
    }

    getAll(): Promise<Like[]> {
        return this.likeRepository.find();
    }

    countLikes(postId): Promise<number> {
        return this.likeRepository.count({
            where: {
                post: {
                    id: postId,
                },
            },
        });
    }

    findAllByPost(postId): Promise<Like[]> {
        return this.likeRepository.find({
            where: {
                post: {
                    id: postId,
                },
            },
        });
    }

    userLikedPost(userId, postId): Promise<boolean> {
        return this.likeRepository.findOne({
            where: {
                user: {
                    id: userId,
                },
                post: {
                    id: postId,
                },
            },
        }).then(like => !!like);
    }
}