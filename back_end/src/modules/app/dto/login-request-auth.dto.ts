import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestAuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', format: 'email', default: 'user@hotmail.com' })
  login: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', format: 'password', default: '*Senha123*' })
  password: string;
}
