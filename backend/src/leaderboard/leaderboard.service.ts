import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";




@Injectable()
export class LeaderboardService {
    constructor(private prisma: PrismaService){}

    async getLeaderboard() {
        return this.prisma.user.findMany()
    }



}