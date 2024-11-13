import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs"
import { JwtPayloadType } from "@/utils/types";
import { setCookie } from "@/utils/generateToken";

export async function POST(request: NextRequest){
    try {
        const body = await request.json()
        const user = await prisma.user.findUnique({ where: {email: body.email} })
        if(user) {
            return NextResponse.json({message: "you are already registered"}, {status: 403})
        }

        const hashedPassword = await bcrypt.hash(body.password, 10)
        
        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword
            },
            select: {
                id: true,
                name: true,
                isAdmin: true
            }
        })

        const jwtPayload: JwtPayloadType = {
            id: newUser.id,
            name: newUser.name,
            isAdmin: newUser.isAdmin
        }
        const cookie = setCookie(jwtPayload)
        return NextResponse.json({newUser}, {status: 201, headers: {"Set-Cookie": cookie}})
        
        
    } catch (error) {
        return NextResponse.json({message: "internal server error", error}, {status: 500})
    }
}