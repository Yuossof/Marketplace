import React from 'react'
import SettingsComp from '@/components/storeComponents/storeSettings/storeAdmin/SettingsComp'
import { verifyTokenForPage } from '@/utils/verifyToken'
import { cookies } from 'next/headers'
import { JwtPayloadType } from '@/utils/types'
import AdminNavbar from '@/components/storeComponents/storeSettings/storeAdmin/adminCompnents/AdminNavbar'
export interface getStoreIdProps {
  params: { settingsStoreId: string }
}
const page = ({ params }: getStoreIdProps) => {
  const token = cookies().get('jwtToken')?.value;
  const { id } = verifyTokenForPage(token as string) as JwtPayloadType;

  return (
    <div className='flex flex-col w-full'>
      <AdminNavbar params={params} />
      <SettingsComp params={params} userId={id} />
    </div>
  )
}

export default page