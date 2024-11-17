import { verifyToken } from "@/utils/verifyToken";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/db";

interface deliveryPayload {
    title: string,
    username: string,
    useremail: string,
    description: string,
    storeId: string,
    userId: string,
    phoneNumber: string
}

export async function POST(request: NextRequest) {
    try {
        const userPayload = verifyToken(request);
        if (userPayload === null) {
            return NextResponse.json({ message: "sorry you are not user please sign in or make account" }, { status: 404 });
        }
        const body = await request.json() as deliveryPayload
       await prisma.notification.create({
            data: {
                title: body.title,
                username: body.username,
                useremail: body.useremail,
                description: body.description,
                phoneNumber: body.phoneNumber,
                storeId: body.storeId,
                userId: body.userId
            }
        })
        return NextResponse.json({ message: "Your application for the job has been submitted."}, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}



export async function PUT(request: NextRequest) {
    try {
        const userPayload = verifyToken(request);
        if (userPayload === null) {
            return NextResponse.json({ message: "sorry you are not user please sign in or make account" }, { status: 404 });
        }
        const body = await request.json()
        const store = await prisma.store.findUnique({ where: { id: body.storeId } })
        if (!store) {
            return NextResponse.json({ message: "Sorry you are not the admin" }, { status: 400 })
        }
        
        const user =  await prisma.user.update({
            where: { id: body.deliveryWorkerId },
            data: {
                workInStore: true,
                worksWith: body.storeId
            }
        })
        return NextResponse.json({message: "accepted!", user}, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}