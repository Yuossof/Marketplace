"use client";
import React, { useEffect, useState } from 'react';
import { getStoreIdProps } from '@/app/(pages)/store/[storeId]/page';
// import Image from 'next/image';
import mm from '../../../public/nav/ui-kits/purple.jpg'
import { Button } from '../ui/button';
import { Menu, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Product from '../product/Product';
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

const StoreItem = ({ params, userId }: getStoreIdProps) => {
  // const [width, setWidth] = useState(false)
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
      } catch (err) {
        setError(err.message);
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
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-muted-foreground">We are dedicated to providing the best products and services to our customers.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/products" className="text-muted-foreground hover:text-foreground">Products</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="text-muted-foreground not-italic">
                123 Store Street<br />
                City, State 12345<br />
                Email: info@mystore.com<br />
                Phone: (123) 456-7890
              </address>
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground">
            <p>&copy; 2023 My Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


// <div className='w-full flex m-auto justify-center mt-10'>
//   <div className=' w-[83%] sm:w-[90%] md:w-[90%] lg:w-4/5 m flex flex-wrap justify-center lg:justify-start md:justify-center sm:justify-center gap-[40px]'>
//     {store && store.products.length > 0 ? (
//       store.products.map((item) => (
//         <div key={item.id} className='bg-white w-[250px] rounded-lg mt-10'>
//           {item.images.length > 0 ? (
//             // eslint-disable-next-line @next/next/no-img-element
//             <img
//               className='rounded-lg border-2 w-[300px] h-[200px]'
//               src={item.images[0].url || ""}
//               alt={item.name || 'no image'}
//             />
//           ) : (
//             <div>No image available</div>
//           )}
//           <div className='flex flex-col'>
//             <div className='p-2 flex justify-between gap-1 mt-1 items-start'>
//               <div className='flex flex-col gap-2'>
//                 <h1 className='font-semibold text-xl text-gray-700'>{item.name}</h1>
//                 <span className='text-gray-600'>{item.price}$</span>
//               </div>
//               <div>
//                 <span className='bg-slate-100 rounded-md p-[1px] text-sm font-semibold px-2 text-gray-600'>UI-kits</span>
//               </div>
//             </div>
//             <div className='w-full'>
//               <Button size="sm">Add to cart <ShoppingBag /></Button>
//             </div>
//           </div>
//         </div>
//       ))
//     ) : (
//       <div>No products available</div>
//     )}

//   </div>
// </div>
export default StoreItem;



// {stores.length === 0 ? (
//   <div>No stores available</div>
// ) : (
//   <div>

//   </div>
// )}