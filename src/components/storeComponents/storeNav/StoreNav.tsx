import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { ShoppingCart } from 'lucide-react'
const StoreNav = () => {
    return (

        <header className="sticky top-0 z-50 h-[60px] px-10 w-full flex justify-center items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/87">
            <div className='flex items-center h-full gap-6'>
                <h1 className='text-3xl font-bold text-gray-700'>hello</h1>
                <div className='flex items-center gap-5 ml-5'>
                    <Link style={{transition: "0.2s"}} className='underline-offset-4 hover:underline  hover:opacity-75' href="/">Products</Link>
                    <Link style={{transition: "0.2s"}} className='underline-offset-4 hover:underline hover:opacity-75' href="/">About</Link>
                </div>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-4">
                <Button variant="outline" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Shopping cart</span>
                </Button>
            </div>
        </header>
    )
}

export default StoreNav