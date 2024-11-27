import React from 'react'
import AddProduct from '@/components/storeComponents/storeSettings/AddProduct'
// import { verifyTokenForPage } from '@/utils/verifyToken';
// import { JwtPayloadType } from '@/utils/types';
// import { cookies } from 'next/headers';
interface Props {
    params: {storeId_product: string}
}
const page = ({params}: Props) => {
    // const token = cookies().get('jwtToken')?.value;
    // const { id } = verifyTokenForPage(token as string) as JwtPayloadType;
    return (
        <div>
            <AddProduct storeId_Product={params.storeId_product}  />
        </div>
    )
}

export default page