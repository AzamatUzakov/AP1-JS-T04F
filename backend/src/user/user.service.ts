import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { nanoid } from 'nanoid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { } //внедряем PrismaService, чтобы работать с базой

    async createUser(name: string, email: string, password: string) {//создаёт пользователя в таблице users
        return this.prisma.user.create({
            data: {
                id: nanoid(),
                name,
                email,
                password,
            },
        });
    }

    async findUserByEmail(email: string) {//ищет пользователя по email, чтобы можно было проверять уникальность или авторизовывать
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async checkUser(email: string, password: string) { // Проверка на login
        const user = await this.findUserByEmail(email)

        if (!user) {
            throw new UnauthorizedException("Неверный email или пароль")
        }
        const inMatch = await bcrypt.compare(password, user.password)
        if (!inMatch) {
            throw new UnauthorizedException('Неверный email или пароль');

        }
        return user
    }

    async getUserByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        if (!user) {
            throw new Error('Пользователь не найден');
        }

        return user;
    }


}
