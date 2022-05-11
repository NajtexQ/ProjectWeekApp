import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('non-users')
export class NonUser {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    password: string;
    @Column({ unique: true })
    email: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
}