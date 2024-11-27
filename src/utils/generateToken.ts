import { JwtPayloadType } from "./types"
import Jwt from "jsonwebtoken"
import {serialize} from "cookie"

export function generateJwt(jwtPayload: JwtPayloadType) : string{
    const token = Jwt.sign(jwtPayload, process.env.JWT_PRIVATE_KEY as string, {
        expiresIn: '30d'
    })

    return token
}


export function setCookie(jwtPayload: JwtPayloadType): string{
     const token = generateJwt(jwtPayload)
     const cookie = serialize("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' || true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 30
    })
    return cookie
}