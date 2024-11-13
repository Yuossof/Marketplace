import Jwt from "jsonwebtoken";
import { JWTpayloadTypes } from "./typs";
import { serialize } from "cookie";


export function generateJwt(jwtPayload: JWTpayloadTypes) : string{
    const token = Jwt.sign(jwtPayload, process.env.JWT_PRIVATE_KEY as string, {
        expiresIn: '30d'
    })

    return token
}


export function setCookie(jwtPayload: JWTpayloadTypes): string{
     const token = generateJwt(jwtPayload)
     const cookie = serialize("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 30
    })
    return cookie
}