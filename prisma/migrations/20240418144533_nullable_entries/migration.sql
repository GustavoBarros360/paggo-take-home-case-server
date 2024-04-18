-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "invoiceSummary" DROP NOT NULL,
ALTER COLUMN "invoiceBucket" DROP NOT NULL;
