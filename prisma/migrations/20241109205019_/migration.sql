/*
  Warnings:

  - You are about to drop the column `bannerDescrip` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `bannerImage` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `bannerTitle` on the `Store` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[storeBannerId]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_storeId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "bannerDescrip",
DROP COLUMN "bannerImage",
DROP COLUMN "bannerTitle",
ADD COLUMN     "storeBannerId" TEXT;

-- CreateTable
CREATE TABLE "StoreBanner" (
    "id" TEXT NOT NULL,
    "bannerImage" TEXT,
    "bannerTitle" TEXT,
    "bannerDescrip" TEXT,
    "height" DOUBLE PRECISION,
    "titleColor" TEXT,
    "titleSize" DOUBLE PRECISION,
    "descriptionColor" TEXT,
    "descriptionSize" TEXT,

    CONSTRAINT "StoreBanner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_storeBannerId_key" ON "Store"("storeBannerId");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_storeBannerId_fkey" FOREIGN KEY ("storeBannerId") REFERENCES "StoreBanner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
