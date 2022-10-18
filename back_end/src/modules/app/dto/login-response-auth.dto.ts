import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseAuthDto {
  @ApiProperty({ type: 'string', format: 'token' })
  token: string;
}
