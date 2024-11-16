import { NextResponse, NextRequest } from "next/server"
import { cookies } from "next/headers"

export function GET(request: NextRequest){
    try {
        cookies().delete("jwtToken")
        return NextResponse.json({message: "logout success"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "internal server error"} , {status: 500})
    }
}