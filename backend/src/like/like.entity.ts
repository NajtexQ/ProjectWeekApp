import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Post } from "../post/post.entity";

@Entity('likes')
export class Like {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.likes, {eager: true})
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Post, post => post.likes, {eager: true})
    @JoinColumn({ name: 'postId' })
    post: Post;
}