import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { AppDataSource } from './database/data-source';
import cors from 'cors';
import userRoutes from './routes/user.routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRoutes);

const PORT = process.env.DB_PORT || 3000;

AppDataSource.initialize()
.then(() => {
    console.log('Conexão com banco de dados estabelecida.');
    app.listen(PORT, () => {
        console.log(`Servidor rodando na PORTA: ${PORT}`);
    });
}).catch((err) => {
    console.log('Erro ao conectar com o banco de dados: ', err);
});
