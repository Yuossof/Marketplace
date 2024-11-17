import React from 'react'
import SubmitDeliveryForm from '@/components/storeComponents/storeDelivery/SubmitDeliveryForm'
import { JwtPayloadType } from '@/utils/types';
import { cookies } from 'next/headers';
import { verifyTokenForPage } from '@/utils/verifyToken';
interface Props {
  params: {storeId: string}
}
const page = ({ params }: Props) => {
  const token = cookies().get('jwtToken')?.value;
  const { id } = verifyTokenForPage(token as string) as JwtPayloadType;
  
  return (
    <div className='flex justify-center items-center w-full h-[90vh]'>
      <SubmitDeliveryForm storeId={params.storeId} userId={id}/>
    </div>
  )
}

export default page