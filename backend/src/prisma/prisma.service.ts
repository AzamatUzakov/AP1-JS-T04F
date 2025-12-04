import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';

@Injectable() //позволяет внедрять PrismaService через DI в другие модули.
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {//Подключаемся к базе данных
        await this.$connect();
        console.log('Prisma connected');
    }

    async onModuleDestroy() {
        await this.$disconnect();
        console.log('Prisma disconnected');
    }
}
