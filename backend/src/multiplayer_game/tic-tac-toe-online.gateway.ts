import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TicTacToeOnlineService } from './tic-tac-toe-online.service';

@WebSocketGateway({ cors: true })
export class TicTacToeOnlineGateway {
    @WebSocketServer()
    server: Server; //Создаёт поле server, которое хранит объект WebSocket-сервера.

    constructor(private readonly tttService: TicTacToeOnlineService) { }

    @SubscribeMessage('joinGame') //Метод ниже будет вызываться каждый раз, когда клиент отправляет сообщение с названием события 'joinGame'
    async handleJoin(@MessageBody() data: { gameId: string, playerId: string }, @ConnectedSocket() client: Socket) {
        const game = await this.tttService.joinOnlineGame(data.gameId, data.playerId);
        client.join(data.gameId); // клиент подписывается на комнату игры
        this.server.to(data.gameId).emit('gameUpdated', game);
    }

    @SubscribeMessage('makeMove')//Метод ниже будет вызываться каждый раз, когда клиент отправляет сообщение с названием события 'makeMovie'
    async handleMove(@MessageBody() data: { gameId: string, player: string, position: number }) {
        const game = await this.tttService.makeMove(data.gameId, data.player, data.position);
        this.server.to(data.gameId).emit('gameUpdated', game);
    }
}
