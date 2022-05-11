import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('auth-users')
export class AuthUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    validUntil: Date;

    @Column()
    uuid: string;
}