import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService,
        private readonly authService: AuthService
    ) { }

    @Post('register')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаём пользователя через UserService
        const user = await this.userService.createUser(name, email, hashedPassword);

        // Возвращаем пользователя без пароля
        const { password: _, ...result } = user;
        return result;
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        const user = await this.userService.checkUser(email, password);
        const { password: _, ...userData } = user;

        return this.authService.login(userData);
    }


    @Get('profile')//для получение пользователя
    async getUser(@Query('email') email: string) {
        return this.userService.getUserByEmail(email);
    }
}
