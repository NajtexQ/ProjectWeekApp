import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../post/post.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    @Exclude()
    password: string;
    @Column({unique: true})
    email: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];
}