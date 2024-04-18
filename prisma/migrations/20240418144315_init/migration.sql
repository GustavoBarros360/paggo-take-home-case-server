-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "invoiceSummary" TEXT NOT NULL,
    "invoiceBucket" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
