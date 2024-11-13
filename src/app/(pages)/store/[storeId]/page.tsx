import React from 'react'
import Link from 'next/link'
export interface getStoreIdProps {
  params: { storeId: string }
}

import StoreItem from '@/components/storeComponents/storeItem'
import { Button } from '@/components/ui/button'
import { Menu, ShoppingCart } from 'lucide-react'
import StoreNav from '@/components/storeComponents/storeNav/StoreNav'

const page = ({ params }: getStoreIdProps) => {

  return (
    <div className='flex flex-col w-full'>
      <StoreNav />
      <StoreItem params={params} />
    </div>
  )
}

export default page


