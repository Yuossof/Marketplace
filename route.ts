import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

/**
 * @method GET
 * @route ~/api/users/logout
 * @desc Create New User
 * @access private
 */

export function GET(request: NextRequest){
    try {
        cookies().delete("jwtToken")
        return NextResponse.json({message: "logout"})
    } catch (error) {
        return NextResponse.json({message: "internal server error"} , {status: 500})
    }
}