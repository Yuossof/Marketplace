-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deliveryOrdersId" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "delivered" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Workers" (
    "id" TEXT NOT NULL,
    "storeId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Workers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryOrders" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "DeliveryOrders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workers" ADD CONSTRAINT "Workers_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrders" ADD CONSTRAINT "DeliveryOrders_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryOrdersId_fkey" FOREIGN KEY ("deliveryOrdersId") REFERENCES "DeliveryOrders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
