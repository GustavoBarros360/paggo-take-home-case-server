import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloPaggo(): string {
    return 'Hello Paggo';
  }

  async invoiceUpload(file: Express.Multer.File): Promise<{ text: string }> {
    const worker = await createWorker('por');
    const response = await worker.recognize(file.buffer);
    return { text: response.data.text };
  }
}
