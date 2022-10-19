/*
  Warnings:

  - The `img_link` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "img_link",
ADD COLUMN     "img_link" INTEGER DEFAULT 1;
