import { Controller, Get } from "@nestjs/common";
import { LeaderboardService } from "./leaderboard.service";




@Controller('leaderboard')


export class LeaderboardContoller {

    constructor(private readonly service: LeaderboardService) { }

    @Get()
    async getAll() {
        return this.service.getLeaderboard()
    }

}