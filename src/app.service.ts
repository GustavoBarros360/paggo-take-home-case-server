import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Invoice } from '@prisma/client';
import { auth } from 'firebase-admin';
import { AWSTextractService } from './aws-textract/aws-textract.service';

type InvoiceUploadParams = {
  token: string;
  file: Express.Multer.File;
};

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private awsTextract: AWSTextractService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async invoiceUpload({ file, token }: InvoiceUploadParams): Promise<Invoice> {
    let decodedToken;
    try {
      decodedToken = await auth().verifyIdToken(token);
    } catch (e) {
      throw new Error('Credenciais inválidas');
    }
    const { uid } = decodedToken;

    const processedText = await this.awsTextract.analyzeInvoice({
      Document: { Bytes: file.buffer },
    });

    return this.prisma.invoice.create({
      data: { userId: uid, invoiceSummary: JSON.stringify(processedText) },
    });
  }

  async getInvoiceById(id: string, userId: string) {
    return this.prisma.invoice.findUnique({
      where: { id: Number(id), userId },
    });
  }
}
