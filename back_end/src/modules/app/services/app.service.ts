import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestAuthDto } from '../dto/login-request-auth.dto';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) {}

  async loginService(userLogn: LoginRequestAuthDto) {
    const userExists = {
      id: '9bb9efd5-8972-4168-ac41-931f07061143',
    };
    if (userLogn.login != 'yuribigsur@icloud.com')
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Login e/ou senha inválidos.',
        },
        HttpStatus.FORBIDDEN,
      );

    return {
      //Gera token
      token: this.jwtService.sign(userExists.id),
    };
  }
}
