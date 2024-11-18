"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import Product from '../product/Product';
import StoreFooter from './StoreFooter';
interface Store {
  storename?: string,
  userId: string,
  storeBanner?: {
    bannerTitle?: string,
    titleSize?: number,
    bannerDescrip?: string,
    descriptionSize?: number,
    titleColor?: string,
    descriptionColor?: string,
    bannerImage?: string,
    height?: string
  },
  products: [
    {
      id: string
      name: string,
      description: string,
      price: number,
      sales: number,
      rating: number,
      createdAt: Date,
      updatedAt: Date,
      images: [
        {
          url: string
        }
      ]
    }
  ]
}

interface getStoreIdProps {
  params: { storeId: string },
  userId?: string
}

const StoreItem = ({ params, userId }: getStoreIdProps) => {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/store/${params.storeId}`);

        const data = response.data;
        console.log(data)
        setStore(data as Store);
      } catch (err: any) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Error message
  }

  return (
    <div className="flex flex-col min-h-screen w-full justify-center">
      {/* Navbar */}


      <main className="flex-1">
        {/* Banner */}
        <div style={{ height: store?.storeBanner?.height }} className="relative w-full">
          {store?.storeBanner?.bannerImage === "" ? "" :
            <Image
              src={store?.storeBanner?.bannerImage || ""}
              alt="Store Banner"
              layout="fill"
              objectFit="cover"
              priority
            />}
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="flex flex-col gap-3 justify-center items-center">
              <h1
                style={{
                  fontSize: `${store?.storeBanner?.titleSize}px` || "24px",
                  color: store?.storeBanner?.titleColor || "#fff"
                }}
                className="text-4xl font-bold text-white mb-4">
                {store?.storeBanner?.bannerTitle}
              </h1>
              <p
                style={{
                  fontSize: `${store?.storeBanner?.descriptionSize}px` || "15px",
                  color: store?.storeBanner?.descriptionColor || "#fff"
                }}>
                {store?.storeBanner?.bannerDescrip || ""}
              </p>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <section className="container mx-auto py-12">
          <Product products={store?.products} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        {userId !== store?.userId ? (<></>) : (
          <Link href={`/store/settings/${params.storeId}`}>to st</Link>
        )}
        <StoreFooter storeId={params.storeId}/>

      </footer>
    </div>
  )
}

export default StoreItem;

