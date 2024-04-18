import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Headers,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { auth } from 'firebase-admin';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello-paggo')
  getHelloPaggo(): string {
    return this.appService.getHelloPaggo();
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
    return this.appService.getInvoiceById(id, userId);
  }

  @Post('/upload-invoice')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Headers() headers: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const token = headers['x-oauth-token'];
    return this.appService.invoiceUpload({ file, token });
  }
}
