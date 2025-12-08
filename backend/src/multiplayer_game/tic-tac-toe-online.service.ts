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


    //Функция для хода игры 
    async makeMove(gameId: string, player: string, position: number) {
        const game = await this.prisma.ticTacToeGameOnline.findUnique({ where: { id: gameId } });
        if (!game || game.status !== 'playing') return null;

        const board = JSON.parse(game.board);

        // Проверка на занятую клетку
        if (board[position] !== null) return null;

        const symbol = game.current;
        if (!symbol) return null; // если текущий игрок не определён, ход невозможен
        board[position] = symbol;

        // Проверяем победителя
        let winner: string | null = null;
        if (this.checkWin(board, symbol)) {
            winner = symbol;
        }

        // Проверяем ничью
        const isDraw = !winner && board.every(cell => cell !== null);

        const nextTurn = winner || isDraw ? null : symbol === 'X' ? 'O' : 'X';
        const status = winner ? 'finished' : isDraw ? 'finished' : 'playing';

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


    private checkWin(board: string[], symbol: string): boolean {//определение победителя
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // строки
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // колонки
            [0, 4, 8], [2, 4, 6]           // диагонали
        ];
        return winPatterns.some(pattern => pattern.every(i => board[i] === symbol));
    }

}
