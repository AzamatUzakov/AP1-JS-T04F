import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TicTacToeModule } from './bot_game/tic-tac-toe.controller.module';
import { TicTacToeOnlineModule } from './multiplayer_game/tic-tac-toe-online.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    PrismaModule,
    UserModule,
    TicTacToeModule,
    TicTacToeOnlineModule
  ],
})
export class AppModule { }
