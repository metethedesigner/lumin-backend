import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ErrorHandler } from '../../common/error-handler';
import { LoginUserDto } from '../dtos/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.usersService.validateUser(username, password);

    if (!user) {
      ErrorHandler.throwError('INVALID_CREDENTIALS');
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        is_admin: user.role === 'admin',
      },
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() request: Request) {
    const user = request.user; // Artık user'ın null olma durumu ortadan kalktı
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}