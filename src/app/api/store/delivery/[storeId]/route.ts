import { verifyToken } from "@/utils/verifyToken";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/db";

export async function GET(request: NextRequest, { params }: { params: {storeId: string} }) {
    try {
        const userPayload = verifyToken(request);
        if (userPayload === null) {
            return NextResponse.json({ message: "sorry you are not user please sign in or make account" }, { status: 404 });
        }
        const notifications = await prisma.notification.findMany({ where: { storeId: params.storeId } })
        return NextResponse.json(notifications, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}

