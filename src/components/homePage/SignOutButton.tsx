"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Power } from 'lucide-react'
import axios from 'axios'
import { Button, buttonVariants } from '../ui/button'
import { useRouter } from 'next/navigation'

const SignOutButton = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const signout = async () => {
        try {
            setIsLoading(true)
            await axios.get("http://localhost:3000/api/user/logout")
            router.refresh()
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Button className={buttonVariants({
            variant: "outline",

        })} disabled={isLoading} onClick={()=> signout()}>
            <Link className='flex gap-2 items-center' href="/">
                <Power className='text-gray-700 w-5 h-5' />
                <span className='text-md text-gray-700'>{isLoading ? "Wait..." : "Sign Out"}</span>
            </Link>
        </Button>
    )
}

export default SignOutButton