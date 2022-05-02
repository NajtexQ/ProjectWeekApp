import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Post } from "../post/post.entity";

@Entity('likes')
export class Like {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.likes)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(type => Post, post => post.likes)
    @JoinColumn({ name: 'post_id' })
    post: Post;
}