import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AWSTextractService } from './aws-textract/aws-textract.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, AWSTextractService],
})
export class AppModule {}
