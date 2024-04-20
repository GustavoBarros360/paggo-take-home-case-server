import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Headers,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { auth } from 'firebase-admin';
import { InvoiceService } from './invoice.service';

@Controller()
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('/invoices')
  async getInvoices(@Headers() headers: any) {
    const token = headers['x-oauth-token'];
    let decodedToken;
    try {
      decodedToken = await auth().verifyIdToken(token);
    } catch (e) {
      throw new Error('Credenciais inválidas');
    }
    const { uid: userId } = decodedToken;
    return this.invoiceService.getAllInvoices(userId);
  }

  @Get('/invoice/:id')
  async getInvoice(@Headers() headers: any, @Param('id') id: string) {
    const token = headers['x-oauth-token'];
    let decodedToken;
    try {
      decodedToken = await auth().verifyIdToken(token);
    } catch (e) {
      throw new Error('Credenciais inválidas');
    }
    const { uid: userId } = decodedToken;
    return this.invoiceService.getInvoiceById(id, userId);
  }

  @Post('/upload-invoice')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Headers() headers: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const token = headers['x-oauth-token'];
    return this.invoiceService.invoiceUpload({ file, token });
  }
}
