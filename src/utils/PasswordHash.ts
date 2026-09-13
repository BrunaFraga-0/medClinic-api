import * as bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, await bcrypt.genSalt(10));
};

export function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
};
