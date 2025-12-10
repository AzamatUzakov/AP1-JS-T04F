import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TicTacToeGameOnline } from '@prisma/client';
@Injectable()
export class TicTacToeOnlineService {
    constructor(private prisma: PrismaService) { }

    async createOnlineGame(playerId: string) {
        // Создаём игру только с playerX
        return this.prisma.ticTacToeGameOnline.create({
            data: {
                playerX: playerId,
                status: "waiting",
                board: JSON.stringify(Array(9).fill(null)),
                current: "X",
            }
        });
    }

    async joinOnlineGame(gameId: string, playerId: string) {
        const game = await this.prisma.ticTacToeGameOnline.findUnique({
            where: { id: gameId },
        });
        if (!game) throw new Error("Game not found");

        // Если игрок пытается присоединиться к своей игре X — просто возвращаем игру
        if (game.playerX === playerId) return game;

        // Если игрок O уже занят другим игроком
        if (game.playerO && game.playerO !== playerId) {
            throw new Error("Room is full");
        }

        // Если O ещё не подключился
        if (!game.playerO) {
            return this.prisma.ticTacToeGameOnline.update({
                where: { id: gameId },
                data: {
                    playerO: playerId,
                    status: "playing", // меняем статус на playing
                },
            });
        }

        // Если O переподключается — возвращаем игру
        return game;
    }

    async makeMove(gameId: string, player: string, position: number) {//Для хода играков
        const game = await this.prisma.ticTacToeGameOnline.findUnique({ where: { id: gameId } });
        if (!game || game.status !== 'playing') return null; //Проверка

        const board = JSON.parse(game.board);

        if (board[position] !== null) return null;

        const symbol = game.current;
        if (!symbol) return null;

        board[position] = symbol;

        let winner: string | null = null;
        if (this.checkWin(board, symbol)) winner = symbol;

        const isDraw = !winner && board.every(cell => cell !== null);
        const nextTurn = winner || isDraw ? null : symbol === 'X' ? 'O' : 'X';
        const status = winner || isDraw ? 'finished' : 'playing';

        return this.prisma.ticTacToeGameOnline.update({
            where: { id: gameId },
            data: {
                board: JSON.stringify(board),
                current: nextTurn ?? undefined,
                status,
                winner: winner ?? null,
            },
        });
    }

    private checkWin(board: string[], symbol: string): boolean {//Проверка на победителя
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern => pattern.every(i => board[i] === symbol));
    }

    async getAllGames() {//Возврощает все игры 
        return this.prisma.ticTacToeGameOnline.findMany({
            where: { status: { in: ["waiting"] } }
        });
    }
}
