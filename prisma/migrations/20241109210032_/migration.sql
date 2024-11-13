/*
  Warnings:

  - The `descriptionSize` column on the `StoreBanner` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "StoreBanner" ALTER COLUMN "height" SET DEFAULT 400,
DROP COLUMN "descriptionSize",
ADD COLUMN     "descriptionSize" DOUBLE PRECISION;
