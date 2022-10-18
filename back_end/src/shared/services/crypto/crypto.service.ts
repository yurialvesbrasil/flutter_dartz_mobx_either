import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class CryptoService {
  // Gera o hash de uma senha
  async generateHash(plainText: string): Promise<string> {
    return hash(plainText, 8);
  }

  // Compara a senha com um hash
  async compareHash(plainText: string, newhash: string): Promise<boolean> {
    return compare(plainText, newhash);
  }
}
