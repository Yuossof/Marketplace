import { NextRequest } from "next/server"
import { JwtPayloadType } from "./types"
import  jwt from "jsonwebtoken"

export function verifyToken(request: NextRequest): JwtPayloadType | null{
    try {
        const jwttoken = request.cookies.get("jwtToken")
        const token = jwttoken?.value as string
        if(!token) return null
        const userPayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string) as JwtPayloadType
        return userPayload
    } catch (error) {
        return null
    }


}


export function verifyTokenForPage(token: string): JwtPayloadType | null{
    try {
        const userPayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string) as JwtPayloadType
        if(!userPayload) return null
        return userPayload
    } catch (error) {
        return null
    }
}