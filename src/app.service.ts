import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloPaggo(): string {
    return 'Hello Paggo';
  }
}
