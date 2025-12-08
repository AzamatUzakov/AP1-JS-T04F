import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { TicTacToeOnlineController } from './tic-tac-toe-online.controller';
import { TicTacToeOnlineService } from './tic-tac-toe-online.service';
import { TicTacToeOnlineGateway } from './tic-tac-toe-online.gateway';

@Module({
    controllers: [TicTacToeOnlineController],
    providers: [TicTacToeOnlineService, PrismaService, TicTacToeOnlineGateway],
})
export class TicTacToeOnlineModule { }
