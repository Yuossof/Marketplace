import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { verifyTokenForPage } from '@/utils/verifyToken'
import { JwtPayloadType } from '@/utils/types'
import { CircleUserRound, ShoppingBag } from 'lucide-react'
const Navbar = () => {
  const token = cookies().get("jwtToken")?.value
  const userPayload: JwtPayloadType | null = verifyTokenForPage(token as string)

  return (
    <div className=' sticky z-50 top-0 inset-x-0 h-16 bg-white w-full'>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <ShoppingBag className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">MarketPlace</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
          <div className='p-[5px] hover:bg-slate-100 rounded-full cursor-pointer transition'>
            <CircleUserRound className='text-gray-700'/>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar