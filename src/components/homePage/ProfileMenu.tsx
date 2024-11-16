"use client"
import React, { useState } from 'react'
import {
    CircleUserRound,
    UserCircle,
    Settings,
    Inbox,
    LifeBuoy,

} from 'lucide-react'
import SignOutButton from './SignOutButton'
import Link from 'next/link'
const ProfileMenu = ({ userPayload }: { userPayload: any }) => {
    const [showMenuBox, setShowMenuBox] = useState<boolean>(false)
    return (
        <>
            {userPayload &&
                <div className='p-[7px] hover:bg-slate-100 rounded-full transition relative'>
                    <CircleUserRound onClick={() => setShowMenuBox(prev => !prev)} className='text-gray-700 cursor-pointer' />
                    {showMenuBox && <div className=' transition-all flex flex-col gap-3 bg-slate-50 w-[170px] rounded-sm p-3 border-[1px] border-gray-300 shadow-lg absolute top-9 -right-1'>
                        <div className='flex flex-col gap-1'>
                            <Link className='flex gap-2 items-center hover:bg-[#eff3f5] rounded-lg pl-2 pr-3 py-2' href="/profile">
                                <UserCircle className='text-gray-700 w-5 h-5' />
                                <span className='text-md text-gray-700'>My Profile</span>
                            </Link>
                            <Link className='flex gap-2 items-center hover:bg-[#eff3f5] rounded-lg pl-2 pr-3 py-2' href="/profile/edit">
                                <Settings className='text-gray-700 w-5 h-5' />
                                <span className='text-md text-gray-700'>Edit Profile</span>
                            </Link>
                            <Link className='flex gap-2 items-center hover:bg-[#eff3f5] rounded-lg pl-2 pr-3 py-2' href="/profile/inbox">
                                <Inbox className='text-gray-700 w-5 h-5' />
                                <span className='text-md text-gray-700'>Inbox</span>
                            </Link>
                            <Link className='flex gap-2 items-center hover:bg-[#eff3f5] rounded-lg pl-2 pr-3 py-2' href="/help-center">
                                <LifeBuoy className='text-gray-700 w-5 h-5' />
                                <span className='text-md text-gray-700'>Help</span>
                            </Link>
                        </div>
                        <div className='h-[2px] bg-gray-200 w-full my-[2px]'></div>
                        <SignOutButton />
                        <div>
                        </div>
                    </div>}
                </div>}
        </>

    )
}

export default ProfileMenu