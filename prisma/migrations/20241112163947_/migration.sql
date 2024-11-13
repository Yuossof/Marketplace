/*
  Warnings:

  - The `height` column on the `StoreBanner` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "StoreBanner" DROP COLUMN "height",
ADD COLUMN     "height" DOUBLE PRECISION DEFAULT 400;
