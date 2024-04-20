import { AnalyzeExpenseCommandOutput } from '@aws-sdk/client-textract';
import { Injectable } from '@nestjs/common';
import { Invoice } from '@prisma/client';
import { auth } from 'firebase-admin';
import { AWSTextractService } from 'src/aws-textract/aws-textract.service';
import { PrismaService } from 'src/prisma.service';

type InvoiceUploadParams = {
  token: string;
  file: Express.Multer.File;
};

@Injectable()
export class InvoiceService {
  constructor(
    private prisma: PrismaService,
    private awsTextract: AWSTextractService,
  ) {}
  getAllInvoices(userId: string) {
    return this.prisma.invoice.findMany({ where: { userId } });
  }
  async getInvoiceById(id: string, userId: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: Number(id), userId },
    });

    return {
      ...invoice,
      invoiceSummary: JSON.parse(
        invoice?.invoiceSummary ?? '',
      ) as AnalyzeExpenseCommandOutput,
    };
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
      data: {
        userId: uid,
        invoiceSummary: JSON.stringify(processedText),
        name: file.filename,
      },
    });
  }
}
