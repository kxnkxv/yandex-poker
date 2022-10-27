-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET DEFAULT '',
ALTER COLUMN "first_name" SET DEFAULT '',
ALTER COLUMN "second_name" SET DEFAULT '';

-- CreateTable
CREATE TABLE "OAuth_Data" (
    "userId" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "userServiceId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuth_Data_userId_serviceName_userServiceId_key" ON "OAuth_Data"("userId", "serviceName", "userServiceId");

-- AddForeignKey
ALTER TABLE "OAuth_Data" ADD CONSTRAINT "OAuth_Data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
