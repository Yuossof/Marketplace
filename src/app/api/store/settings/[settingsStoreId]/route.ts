import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import prisma from "@/utils/db";
// import { Store } from "@prisma/client";
import { storeDataPutDto } from "@/utils/Dto";

export type GetStoreIdProps = {
    params: { settingsStoreId: string },
}

export async function GET(request: NextRequest, { params }: GetStoreIdProps) {
    try {
        const userPayload = verifyToken(request)
        if (userPayload === null) {
            return NextResponse.json({ message: "sorry you are not user please sign in or make account" }, { status: 404 })
        }
        const storeItem = await prisma.store.findUnique({
            where: { id: params.settingsStoreId },
            select: {
                name: true,
                description: true,
                storeImage: true,
                createdAt: true,
                updatedAt: true,
                storeBanner: {
                    select: {
                        bannerTitle: true,
                        titleSize: true,
                        bannerDescrip: true,
                        descriptionSize: true,
                        titleColor: true,
                        descriptionColor: true,
                        bannerImage: true,
                        height: true
                    }
                }
            }
        })

        if (!storeItem) {
            return NextResponse.json({ message: "no store yet!" }, { status: 404 })
        }
        return NextResponse.json(storeItem, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}

// const userPayload =  verifyToken(request)
// if(userPayload == null){
//     return NextResponse.json({ message: "sorry you are not user please sign in or make account" }, { status: 401 })
// }

export async function PUT(request: NextRequest, { params }: GetStoreIdProps) {
    try {
        const body = await request.json() as storeDataPutDto
        const store = await prisma.store.update({
            where: { id: params.settingsStoreId },
            data: {
                name: body.name,
                description: body.description,
                storeImage: body.storeImage,
                userId: body.userId,
            },
            select: {
                name: true,
                description: true,
                storeImage: true,
                userId: true,
                storeBannerId: true
            }
        })

        if (store.storeBannerId !== null) {
            await prisma.storeBanner.update({
                where: { id: store.storeBannerId },
                data: {
                    bannerTitle: body.storeBanner?.bannerTitle,
                    bannerImage: body.storeBanner?.bannerImage,
                    bannerDescrip: body.storeBanner?.bannerDescrip,
                    height: body.storeBanner?.height,
                    titleColor: body.storeBanner?.titleColor,
                    titleSize: body.storeBanner?.titleSize,
                    descriptionColor: body.storeBanner?.descriptionColor,
                    descriptionSize: body.storeBanner?.descriptionSize,
                }
            })
        } else{
            return NextResponse.json({message: "storeBannerId is null. No storeBanner to update."}, {status: 400})
        }

        return NextResponse.json({ message: "store updated sucessfully" }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: "internal server error", error }, { status: 500 })
    }
}