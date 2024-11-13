"use client"
import Sidebar from '@/components/Sidebar'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import AddProductBox from './AddProductBox'
import { useState } from 'react'
import AdminNavbar from './storeAdmin/adminCompnents/AdminNavbar'
import Link from 'next/link'
interface Props {
    storeId_Product: string
}

const AddProduct = ({ storeId_Product }: Props) => {
    console.log(storeId_Product)
    const [showBox, setShowBox] = useState("none");
    const [scl, setScl] = useState("0");

    return (
        <div className='w-screen'>
            <AdminNavbar params={{
                settingsStoreId: ''
            }} />
            <div className='w-full flex  pr-5 mt-[80px]'>
                <div className='fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black bg-opacity-55 mt-[60px]'>
                    <AddProductBox storeId={storeId_Product}/>
                </div>
            </div>
        </div>

    )
}

export default AddProduct