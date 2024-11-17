/*
  Warnings:

  - You are about to drop the column `worksIn` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "useremail" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "worksIn",
ADD COLUMN     "workInStore" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "worksWith" TEXT;
