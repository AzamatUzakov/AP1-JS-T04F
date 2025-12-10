import { Module } from "@nestjs/common";
import { LeaderboardContoller } from "./leaderboard.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { LeaderboardService } from "./leaderboard.service";





@Module({
    controllers: [LeaderboardContoller],
    providers: [LeaderboardService, PrismaService]
})

export class LeaderboardModule { }