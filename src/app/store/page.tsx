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
        <div className='flex flex-col'>

            <div className='w-full flex fixed left-0 right-0'>
                <Navbar />
            </div>
                {/* <div className='w-full p-5'> */}
                    <div className=' flex justify-center mt-[110px]'>
                        <StoresItems />
                        <CreateStoreBox userId={id} />
                    </div>
                {/* </div> */}
        </div>

    );
}

export default page;
