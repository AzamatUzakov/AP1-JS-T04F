import { Body, Controller, Get, Post } from "@nestjs/common";
import { TicTacToeOnlineService } from "./tic-tac-toe-online.service";




@Controller('tictoctoe-online')

export class TicTacToeOnlineController {

    constructor(private readonly service: TicTacToeOnlineService) {

    }

    @Post("create")
    async createGame(@Body('playerId') playerId: string) {
        return this.service.createOnlineGame(playerId)
    }
    @Post('join')
    async joinGame(
        @Body('gameId') gameId: string,
        @Body('playerId') playerId: string
    ) {
        return this.service.joinOnlineGame(gameId, playerId)
    }

    @Get('allGames')
    async getAll() {
        return this.service.getAllGames()
    }
}
