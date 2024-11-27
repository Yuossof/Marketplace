// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/utils/db";

// type OrderItem = {
//     orderId: string,
//     productId: string,
//     quantity: number,
//     price: number
// }
// interface OrderInfo {
//     userId?: string,
//     totalAmount?: string,
//     items?: OrderItem,
//     storeId?: string
// }
// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json() as OrderInfo
//         const order = await prisma.order.findFirst({
//             where: { userId: body.userId }
//         })
//         const workers = await prisma.workers.findMany({ where: { storeId: body.storeId } })

//         if (!order) {
//             await prisma.order.create({
//                 data: {
//                     userId: body?.userId as string, 
//                     deliveryOrdersId: "temp"
//                 }
//             })
//         }

//         if (order) {

//             await prisma.orderItem.createMany({
//                 data: {
//                     orderId: order?.id,
//                     productId: body?.items?.productId as string,
//                     price: body?.items?.price as number,
//                     quantity: body?.items?.quantity as number
//                 }
//             })
//         }

//         await prisma.deliveryOrders.create({
//             data: {

//             }
//         })

//     } catch (error) {
//         return
//     }
// }