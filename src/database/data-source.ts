import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3000,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    extra: {
        idleTimeoutMillis: Number(process.env.DB_TIME_OUT_MS) || 30000,
        connectionTimeoutMillis: 30000
    },
    synchronize: true,
    logging: true,

    entities: [User]
});
