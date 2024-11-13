'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, BarChart2 } from 'lucide-react'
import Image from 'next/image'
interface Props {
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





export default function Product({ products }: Props) {
    const [isAdded, setIsAdded] = useState(false)

    const handleAddToCart = () => {
        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {products.map((product) => (
                    <Card className="w-full max-w-xs  overflow-hidden">
                        <div className="relative h-52">
                            {/* <img src={product.images[0].url} alt={product.name} className="w-full h-52 object-cover" /> */}
                            <Image src={product.images[0].url} alt='no' layout="fill"
                                objectFit="cover"
                                priority />
                        </div>
                        <CardContent className="p-4">
                            <h2 className="text-md font-semibold text-gray-800 mb-2 truncate">{product.name}</h2>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-700 font-semibold">${product.price.toFixed(2)}</span>
                                <div className="flex items-center bg-primary/10 rounded-full px-1.5 py-0.5">
                                    <BarChart2 className="w-3 h-3 text-primary mr-0.5" />
                                    <span className="text-xs font-medium text-primary">{product.sales.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="flex items-center mb-2">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            className={`w-3 h-3 mr-0.5 ${star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                                                }`}
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 22 20"
                                        >
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="ml-1 text-xs text-gray-500">4.5</p> {/*product.rating.toFixed(1) */}
                            </div>
                            <Button
                                className="w-full text-xs py-1"
                                onClick={handleAddToCart}
                                disabled={isAdded}
                            >
                                {isAdded ? (
                                    "Added!"
                                ) : (
                                    <>
                                        <ShoppingCart className="mr-1 h-3 w-3" /> Add to Cart
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}