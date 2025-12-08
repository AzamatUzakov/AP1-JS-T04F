import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { TicTacToeOnlineController } from './tic-tac-toe-online.controller';
import { TicTacToeOnlineService } from './tic-tac-toe-online.service';

@Module({
    controllers: [TicTacToeOnlineController],
    providers: [TicTacToeOnlineService, PrismaService],
})
export class TicTacToeOnlineModule { }
