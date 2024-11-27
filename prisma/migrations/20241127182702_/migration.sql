/*
  Warnings:

  - You are about to drop the column `deliveryOrdersId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `DeliveryOrders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `storeId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DeliveryOrders" DROP CONSTRAINT "DeliveryOrders_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_deliveryOrdersId_fkey";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "deliveryOrdersId",
ADD COLUMN     "delivered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deliveryUserId" TEXT,
ADD COLUMN     "storeId" TEXT NOT NULL,
ALTER COLUMN "totalAmount" SET DEFAULT 0;

-- DropTable
DROP TABLE "DeliveryOrders";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryUserId_fkey" FOREIGN KEY ("deliveryUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
