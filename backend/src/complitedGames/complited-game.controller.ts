import { Controller, Get } from "@nestjs/common";
import { ComplitedGamesService } from './complited-game.service';




@Controller("complited-games")
export class ComplitedGamesController {
    constructor(private readonly service: ComplitedGamesService) { }
    @Get()
    async getComplitedGames() {
        return this.service.getComplitedGames()
    }

}