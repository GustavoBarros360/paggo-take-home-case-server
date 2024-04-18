import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';
import { PrismaService } from './prisma.service';
import { Invoice } from '@prisma/client';
import { auth } from 'firebase-admin';

type InvoiceUploadParams = {
  token: string;
  file: Express.Multer.File;
};

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getHelloPaggo(): string {
    return 'Hello Paggo';
  }

  async invoiceUpload({ file, token }: InvoiceUploadParams): Promise<Invoice> {
    let decodedToken;
    try {
      decodedToken = await auth().verifyIdToken(token);
    } catch (e) {
      throw new Error('Credenciais inválidas');
    }
    const { uid } = decodedToken;
    const worker = await createWorker('por');
    const response = await worker.recognize(file.buffer);
    return this.prisma.invoice.create({
      data: { userId: uid, invoiceSummary: response.data.text },
    });
  }

  async getInvoiceById(id: string, userId: string) {
    return this.prisma.invoice.findUnique({
      where: { id: Number(id), userId },
    });
  }
}
