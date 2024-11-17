import React from 'react'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import NotificationBox from './NotificationBox'
// import NotificationBox from './NotificationBox'
interface Props {
    params: { settingsStoreId: string },
}
const AdminNavbar = ({ params }: Props) => {
    return (
        <header className="w-full fixed top-0 right-0 left-0 border-b z-20  backdrop-blur flex justify-between px-7 items-center h-[60px]">
            <div className='flex items-center gap-8'>
                <h1 className='text-xl font-bold text-gray-700'>My Store</h1>
                <ul className='flex gap-4 items-center'>
                    <Link className='font-semibold text-gray-700 hover:underline' href="/">Market Home</Link>
                    <Link className='font-semibold text-gray-700 hover:underline' href="/store">stores</Link>
                    <Link className='font-semibold text-gray-700 hover:underline' href={`/store/${params.settingsStoreId}`}>store home</Link>
                    <Link className='font-semibold text-gray-700 hover:underline' href={`/store/settings/${params.settingsStoreId}`}>Banner</Link>
                    <Link className='font-semibold text-gray-700 hover:underline' href={`/store/products/${params.settingsStoreId}`}>Products</Link>
                </ul>
            </div>
            <div className=' relative'>
                <Bell />
                <div className=' absolute top-5 right-0'>
                    <NotificationBox  storeId={params.settingsStoreId}/>
                </div>
            </div>
        </header>
    )
}

export default AdminNavbar