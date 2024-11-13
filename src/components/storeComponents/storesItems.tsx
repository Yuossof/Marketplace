"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
// import storeI from "../../../public/nav/ui-kits/blue.jpg";
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { Trash2 } from 'lucide-react';
import Spinner from '../loading/Spinner';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Store {
  id: string;
  name: string;
  description: string;
  storeImage: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    products: number;
  };
}

interface StoreResponse {
  store: Store[];
}
const StoresItems = () => {
  const router = useRouter()
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSpinner, setLoadingSpinner] = useState<boolean>(false)
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/store');
        if (!response.ok) {
          throw new Error('Failed to fetch stores');
        }
        const data: StoreResponse = await response.json();
        setStores(data.store);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []); // Empty dependency array means this runs once on mount

  const deleteStore = async (storeId: string) => {
    try {
      setLoadingSpinner(true)
      await axios.delete(`http://localhost:3000/api/store/${storeId}`)
      router.refresh()
      window.location.reload()
      setLoadingSpinner(false)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingSpinner(false)
    }
  }
  if (loading) {
    return <div>
      ...loading
    </div>; // Loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Error message
  }

  return (
    <div className='flex flex-wrap justify-center w-full'>
      {loadingSpinner && <Spinner />}
      {stores.length === 0 ? (
        <div>No stores available</div>
      ) : (
        stores.map((store) => (
          <div key={store.id} className='w-[300px] relative shadow-lg  overflow-hidden  border-2 border-gray-200 rounded-lg box-border m-[10px] flex flex-col justify-between '>
            <span onClick={() => deleteStore(store.id)} className='absolute top-3 right-3 border-2 rounded-full w-8 h-8 flex justify-center bg-slate-50 items-center cursor-pointer hover:opacity-70 transition'>
              <Trash2 className='w-5' />
            </span>
            <div className='w-full h-[300px] '>
              <Image priority width={300} height={300} className='h-[280px] w-full' src={store.storeImage as string} alt='no image' />
            </div>
            <div className='w-full flex flex-col  justify-center gap-4 flex-1'>
              <div className='ml-3 flex flex-col gap-1 '>
                <h1 className='text-xl text-gray-700'>{store.name}</h1>
                <p className='text-muted-foreground text-sm'>{store.description || 'No description available'}</p>
              </div>
              <div className='flex w-full justify-center mb-2 '>
                <Link href={`/store/${store.id}`} className={buttonVariants({
                  className: "flex items-center gap-2 w-[95%] border-[1px] border-gray-200",
                  variant: "secondary"
                })}>
                  Go to store &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StoresItems;
