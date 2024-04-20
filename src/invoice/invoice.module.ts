import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { PrismaService } from 'src/prisma.service';
import { AWSTextractService } from 'src/aws-textract/aws-textract.service';

@Module({
  imports: [],
  controllers: [InvoiceController],
  providers: [InvoiceService, PrismaService, AWSTextractService],
})
export class InvoiceModule {}
