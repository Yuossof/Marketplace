import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs"
import prisma from "@/utils/db";
import { setCookie } from "@/utils/generateToken";
import { JwtPayloadType } from "@/utils/types";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const user = await prisma.user.findUnique({ where: {email: body.email} })
        if(!user) {
            return NextResponse.json({message: "please make an account"}, {status: 403})
        }
        const verifyPassword = await bcrypt.compare(body.password, user.password)
        if(!verifyPassword) {
            return NextResponse.json({message: "invalid email or password"}, {status: 403})
        }
        const jwtPayload: JwtPayloadType = {
            id: user.id,
            name: user.name,
            isAdmin: user.isAdmin,
            workWith: user.worksWith === null ? "not workin" : user.worksWith,
            workInStore: user.workInStore
        }
        
        const cookie = setCookie(jwtPayload)
        return NextResponse.json({message: "Authenticated"}, {status: 200 , headers: {"Set-Cookie": cookie}})
    } catch (error) {
        return NextResponse.json({message: "internal server error", error}, {status: 500})
    }
}