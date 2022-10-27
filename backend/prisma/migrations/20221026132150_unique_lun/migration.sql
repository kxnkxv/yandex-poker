/*
  Warnings:

  - A unique constraint covering the columns `[serviceName,userServiceId]` on the table `OAuth_Data` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OAuth_Data_userId_serviceName_userServiceId_key";

-- CreateIndex
CREATE UNIQUE INDEX "OAuth_Data_serviceName_userServiceId_key" ON "OAuth_Data"("serviceName", "userServiceId");
