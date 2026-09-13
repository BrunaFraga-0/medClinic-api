import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';

export const UserRepository = AppDataSource.getRepository(User).extend({
    async findByEmail(email: string) {
        return this.findOneBy({ email });
    },

    async findById(id: string) {
        return this.findOneBy({ id });
    }
});

