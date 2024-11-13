import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        console.log(body)
        const userPayload = verifyToken(request)
        if (userPayload === null) {
            return NextResponse.json({ message: "please login or register" }, { status: 404 })
        }
        const newProduct = await prisma.product.create({
            data: {
                name: body.name,
                description: body.description,
                price: body.price,
                fileUrl: body.fileUrl,
                storeId: body.storeId,
            }
        })

        const productImagesData = body.url.map((imageUrl: string) => ({
            url: imageUrl,
            productId: newProduct.id,
        }));

        await prisma.productImage.createMany({
            data: productImagesData,
        });



        return NextResponse.json({ message: "Prosuct Added successfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}


// export async function GET(request: NextRequest) {
//     try {
//         const userPayload = verifyToken(request)
//         if(userPayload === null){
//             return NextResponse.json({ message: "please login or register" }, { status: 404 })
//         }
//         const products = await prisma.product.findMany({
//             where: {id}
//         })
//     } catch (error) {
//         return NextResponse.json({ message: "internal server error" }, { status: 500 })
//     }
// }