import { Injectable } from '@nestjs/common';
import { PrismaService } from './src/prisma';

@Injectable()
export class AppService {
  getHello(): string {
    return 'D!';
  }
}
