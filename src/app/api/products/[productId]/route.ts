import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/db";

export async function GET(request: NextRequest, { params }: {params: {productId: string}}) {
    try {
        const product = await prisma.product.findUnique({ 
            where: { id: params.productId } ,
            select: {
                name: true,
                description: true,
                price: true,
                rating: true,
                sales: true,
                fileUrl: true,
                createdAt: true,
                updatedAt: true,
                images: true
            }
        })
        return NextResponse.json(product, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error haha" }, { status: 500 })
        
    }
}