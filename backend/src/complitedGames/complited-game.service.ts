import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";



@Injectable()
export class ComplitedGamesService {
    constructor(private readonly prisma: PrismaService) {

    }

    async getComplitedGames() {
        return this.prisma.ticTacToeGameOnline.findMany({
            where: { status: { in: ["finished"] } }
        });
    }
}