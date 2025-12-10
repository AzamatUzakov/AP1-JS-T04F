import { Module } from "@nestjs/common";
import { ComplitedGamesController } from "./complited-game.controller";
import { ComplitedGamesService } from "./complited-game.service";
import { PrismaService } from "src/prisma/prisma.service";



@Module({
    
    controllers: [ComplitedGamesController],
    providers: [ComplitedGamesService, PrismaService],
})

export class ComplitedGamesModule { }