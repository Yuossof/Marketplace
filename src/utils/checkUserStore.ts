// authUtils.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from './db';
import { verifyToken } from './verifyToken';
export async function verifyUserStore(request: NextRequest, storeId: string) {
    const userPayload = verifyToken(request);
    if (userPayload === null) {
        return NextResponse.json({ message: "sorry you are not user please sign in or make account" }, { status: 404 });
    }

    const CheckUserStore = await prisma.store.findUnique({ where: { id: storeId } });
    if (CheckUserStore?.userId !== userPayload.id) {
        return NextResponse.json({ message: "you don't have any store!" }, { status: 404 });
    }


    
}
