import { NextResponse, NextRequest } from "next/server";
import { storeDataDto } from "@/utils/Dto";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as storeDataDto

        let storeBannerId = null;
        if (body.storeBanner) {
            const storeBanner = await prisma.storeBanner.create({
                data: {
                    bannerImage: body.storeBanner.bannerImage,
                    bannerTitle: body.storeBanner.bannerTitle,
                    bannerDescrip: body.storeBanner.bannerDescrip,
                    titleColor: body.storeBanner.titleColor,
                    titleSize: body.storeBanner.titleSize,
                    descriptionColor: body.storeBanner.descriptionColor,
                    descriptionSize: body.storeBanner.descriptionSize,
                }
            });
            storeBannerId = storeBanner.id; // تعيين `id` الخاص بـ `StoreBanner`
        }

        // إنشاء `Store` باستخدام `storeBannerId` إذا كان موجودًا
        const store = await prisma.store.create({
            data: {
                userId: body.userId,
                name: body.name,
                description: body.description,
                storeImage: body.storeImage,
                storeBannerId: storeBannerId // تعيين `storeBannerId` هنا
            },
            select: {
                id: true,
                userId: true,
                name: true,
                description: true,
                storeImage: true,
                storeBannerId: true
            }
        });

        return NextResponse.json({ store }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}


export async function GET(request: NextRequest) {
    try {
        const userPayload = verifyToken(request)
        if (userPayload === null) {
            return NextResponse.json({ message: "sorry you are not user please sign in or make account" }, { status: 404 })
        }

        const store = await prisma.store.findMany({
            where: { userId: userPayload?.id },
            select: {
                id: true,
                name: true,
                description: true,
                storeImage: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: { products: true }
                }
            }
        })

        if (!store) {
            return NextResponse.json({ message: "no stores yet!" }, { status: 404 })
        }
        return NextResponse.json({ store }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })

    }
}

