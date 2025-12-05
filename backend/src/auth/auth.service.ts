import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email };
        return {
            token: this.jwtService.sign(payload),
            user,
        };
    }
}
