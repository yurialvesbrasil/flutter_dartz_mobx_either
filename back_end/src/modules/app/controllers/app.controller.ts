import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginServerErrorFailure } from 'src/exceptions/login_failure';
import { LoginRequestAuthDto } from '../dto/login-request-auth.dto';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async home() {
    return 'Ola';
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Login e/ou senha inválidos',
  })
  //@UseGuards(LocalAuthGuard) //Verifica token de jwt
  @ApiOperation({ summary: 'User authentication' })
  @ApiBody({
    description: 'User info',
    type: LoginRequestAuthDto,
  })
  async handleLogin(@Body() body: LoginRequestAuthDto) {
    return this.appService.loginService(body);
  }
}
