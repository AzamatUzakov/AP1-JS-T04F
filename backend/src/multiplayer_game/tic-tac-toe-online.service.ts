import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TicTacToeGameOnline } from '@prisma/client';
@Injectable()
export class TicTacToeOnlineService {
    constructor(private prisma: PrismaService) { }

    async createOnlineGame(playerId: string) {
        return this.prisma.ticTacToeGameOnline.create({
            data: {
                playerX: playerId,
            }
        });
    }

    async joinOnlineGame(gameId: string, platyerId: string) {
        const game = await this.prisma.ticTacToeGameOnline.findUnique({
            where: { id: gameId },
        })
        if (!game) {
            throw new Error("Game not found")
        }

        // Игрок X уже есть - значит игрокO должен быть пустым
        if (game.playerO && game.playerO !== platyerId) {
            throw new Error('Room is full')
        }

        // Если второй игрок подключается впервые
        if (!game.playerO) {
            return this.prisma.ticTacToeGameOnline.update({
                where: { id: gameId },
                data: {
                    playerO: platyerId,
                    status: "playing",
                }
            })
        }

        // Если O переподключается (например перезагрузил вкладку)
        return game;

    }

}
