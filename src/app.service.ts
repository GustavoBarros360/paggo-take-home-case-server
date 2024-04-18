import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getHelloPaggo(): string {
    return 'Hello Paggo';
  }

  async invoiceUpload(file: Express.Multer.File): Promise<{ text: string }> {
    const worker = await createWorker('por');
    const response = await worker.recognize(file.buffer);
    await this.prisma.invoice.create({
      data: { userId: '123', invoiceSummary: response.data.text },
    });
    return { text: response.data.text };
  }
}
