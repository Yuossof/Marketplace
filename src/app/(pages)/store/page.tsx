import React from 'react';
import CreateStoreBox from '@/components/storeComponents/createStoreBox';
import { cookies } from 'next/headers';
import { verifyTokenForPage } from '@/utils/verifyToken';
import { JwtPayloadType } from '@/utils/types';
import StoresItems from '@/components/storeComponents/storesItems';
import Navbar from '@/components/homePage/Navbar';

const page = async () => {


    const token = cookies().get('jwtToken')?.value;
    const { id } = verifyTokenForPage(token as string) as JwtPayloadType;

    return (
        <>

            <div className='w-full flex-col'>
                <Navbar />

                <div className='w-full  p-5'>
                    <div className='mb-5'>
                        <CreateStoreBox userId={id} />
                    </div>
                    <div className='w-full flex justify-center'>
                        <StoresItems userId={id}/>
                    </div>
                </div>
            </div>
        </>

    );
}

export default page;
