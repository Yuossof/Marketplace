'use client'

import { useState } from 'react'
import { Star, Truck, RefreshCw, Heart, Share2, ZoomIn, Plus, Minus, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import axios from 'axios'
import { useEffect } from 'react'
import Image from 'next/image'


interface Product {
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

export default function ProductDetails({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mainImage, setMainImage] = useState("")

  useEffect(() => {
    const getProductDetails = async () => {
      const response = await axios.get(`http://localhost:3000/api/products/${productId}`)
      const data = response.data as Product
      // console.log(data)
      setProduct(data)
      setMainImage(data.images[0].url)
    }

    getProductDetails()
  }, [])

  


  const [selectedColor, setSelectedColor] = useState('black')

  const colors = ['black', 'white', 'blue']

  const handleImageClick = (image: string) => {
    setMainImage(image)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0 ">
              <Image
                src={mainImage}
                alt="Main Product Image"
                width={400}
                height={400}
                className="w-full h-auto object-cover"
              />
            </CardContent>
          </Card>
          <div className="grid grid-cols-5 gap-2">
            {product?.images.map((image, i) => (
              <Card
                key={i}
                className={`overflow-hidden cursor-pointer transition-all ${mainImage === image.url ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-gray-300'}`}
                onClick={() => handleImageClick(image.url)}
              >
                <CardContent className="p-0 w-full h-full">
                  <Image
                    src={image.url}
                    alt={`Product Image ${i + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product?.name}</h1>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
              <span className="ml-2 text-sm text-gray-600">{product?.rating || 0}</span>
            </div>
          </div>

          <p className="text-2xl font-bold">${product?.price}</p>

          <p className="text-gray-600">
            {product?.description}
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Color</h3>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-primary' : 'border-gray-300'
                      }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className='flex-1 flex  justify-between items-center'>
              <Button className='w-[78%]'>
                Buy Now
                <ShoppingCart />
                </Button>
              <Button variant="outline" className='w-[20%]'>
                <ShoppingCart className="w-4 h-4 mr-2" />
                <Plus />
              </Button>
            </div>
            <Button variant="outline">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Adjustable lumbar support</li>
              <li>Breathable mesh back</li>
              <li>Customizable armrests</li>
              <li>360-degree swivel</li>
              <li>Weight capacity: 300 lbs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}