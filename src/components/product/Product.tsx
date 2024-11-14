'use client'
import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, BarChart2, Star, Plus } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '../ui/badge'

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

    return (
        <div className="container mx-auto w-full px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-11">
                    {products.map((product) => {
                        const [isHovered, setIsHovered] = useState(false)

                        return (
                            <Card
                                key={product.id}
                                className="w-60 overflow-hidden transition-all duration-300 hover:shadow-md"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div className="relative">
                                    <img
                                        src={product.images[0].url} alt={product.name}
                                        className="w-full h-40 object-cover"
                                    />
                                    {20 > 0 && (
                                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                                            -{10}%
                                        </Badge>
                                    )}
                                    <Button
                                        size="sm"
                                        className="absolute bottom-2 right-0 rounded-none rounded-l-md transition-all duration-300 bg-white  hover:bg-gray-200 text-black"
                                        style={{
                                            transform: isHovered ? 'translateX(0)' : 'translateX(110%)',
                                            opacity: isHovered ? 1 : 0
                                        }}
                                    >
                                        <ShoppingCart className=" h-3 w-3" />
                                        <Plus />
                                    </Button>
                                </div>
                                <CardContent className="p-3">
                                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xl font-bold text-green-600">${product.price}</span>
                                        <span className="text-sm text-gray-500 line-through">$159.99</span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                        ))}
                                        <span className="ml-2 text-sm text-gray-600">(128)</span>
                                    </div>
                                    <p className="text-sm text-gray-600">Sold: 1,234</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

