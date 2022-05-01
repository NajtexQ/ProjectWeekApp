import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Like } from "../like/like.entity";

@Entity('posts')
export class Post {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.posts, {eager: true})
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => Like, like => like.post)
    @JoinColumn({ name: 'postId' })
    likes: Like[];

    @Column({ nullable: true })
    image: string;
}