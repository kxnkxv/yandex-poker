-- AlterTable
ALTER TABLE "OAuth_Data" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "OAuth_Data_pkey" PRIMARY KEY ("id");
