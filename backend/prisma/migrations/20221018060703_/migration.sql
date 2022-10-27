/*
  Warnings:

  - You are about to drop the column `Balance` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Balance",
ADD COLUMN     "balance" INTEGER DEFAULT 1000;
