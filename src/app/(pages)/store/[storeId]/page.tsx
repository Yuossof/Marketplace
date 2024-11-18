import React from 'react'
import StoreItem from '@/components/storeComponents/storeItem'
import StoreNav from '@/components/storeComponents/storeNav/StoreNav'
import { cookies } from 'next/headers'
import { verifyTokenForPage } from '@/utils/verifyToken'
import { JwtPayloadType } from '@/utils/types'
export interface getStoreIdProps {
  params: { storeId: string },
}
const page = ({ params }: getStoreIdProps) => {
  const token = cookies().get('jwtToken')?.value;
  const userPayload = verifyTokenForPage(token as string) as JwtPayloadType;

  return (
    <div className='flex flex-col w-full'>
      <StoreNav />
      <StoreItem userId={!userPayload ? "" : userPayload.id} params={params} />
    </div>
  )
}

export default page


