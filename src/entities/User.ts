import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

export enum UserRole{
    ADMIN = "ADMIN",
    ATENDENTE = "ATENDENTE"
};

@Entity("users")
export class User{
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ type: 'varchar', length: 100 })
    name!: string

    @Column({ type: 'varchar', unique: true, length: 255 })
    email!: string

    @Column({ type: 'varchar', length: 255  })
    password!: string

    @Column({ type: 'enum', enum: UserRole, default: UserRole.ATENDENTE })
    role?: UserRole

    @CreateDateColumn({name: 'created_at', type: 'timestamp', default: () => 'now()' })
    createdAt!: Date 
};