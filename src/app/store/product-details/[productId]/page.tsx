import ProductDetails from '@/components/product/ProductDetails'
import React from 'react'
import StoreNav from '@/components/storeComponents/storeNav/StoreNav'
const page = ({ params }: { params: {productId: string} }) => {

  return (
    <div className='w-full'>
        <StoreNav />
        <ProductDetails productId={params.productId}/>
    </div>
  )
}

export default page