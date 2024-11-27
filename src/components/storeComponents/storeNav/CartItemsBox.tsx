"use client"
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { MinusCircle, PlusCircle, ShoppingCart, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const CartItemsBox = () => {
    const [showBox, setShowBox] = useState(false)
    const [cart, setCart] = useState<any[]>([])

    // Load cart from localStorage
    useEffect(() => {
        const loadCart = () => {
            const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
            setCart(storedCart)
        }
        loadCart()
    }, [showBox])

    // Update quantity in localStorage
    const updateQuantity = (productId: string, change: number) => {
        const updatedCart = cart.map((item: any) => {
            if (item.productId === productId) {
                const newQuantity = Math.max(item.productQuantity + change, 1) // Ensure minimum quantity of 1
                return { ...item, productQuantity: newQuantity }
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(updatedCart)) // Update localStorage
        setCart(updatedCart) // Update state
    }

    return (
        <div className='relative'>
            {/* Toggle Cart Box */}
            <div className='relative  p-1'>
                <Button onClick={() => setShowBox(prev => !prev)}  variant="outline" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                </Button>
                <span className='w-4 h-4 rounded-full bg-red-600 text-white absolute top-0 right-0 text-sm flex justify-center items-center'>{cart.length}</span>
            </div>


            {/* Cart Box */}
            <div className={`${showBox ? "" : "hidden"} absolute top-11 right-4 shadow-lg rounded-lg w-[600px]`}>
                <Card className="w-full border-2">
                    <CardHeader>
                        <CardTitle>Your Cart</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap">
                        {cart.length > 0 ? (
                            cart.map((product) => (
                                <div key={product.productId} className="flex items-center bg-slate-50 p-4">
                                    {/* Product Image */}
                                    <Image
                                        src={product.productImage}
                                        alt={product.productName}
                                        width={80}
                                        height={80}
                                        className="rounded-md"
                                    />
                                    {/* Product Info */}
                                    <div className="flex-1 space-y-1 flex items-center gap-9 ml-5">
                                        <div className='flex flex-col gap-2'>
                                            <h3 className="font-medium text-lg text-gray-700">{product.productName}</h3>
                                            <p className="text-sm text-gray-500">${product.productPrice}</p>
                                        </div>
                                        {/* Quantity Controls */}
                                        <div className="flex items-center space-x-2">
                                            {/* Decrease Quantity */}
                                            <Button
                                                onClick={() => updateQuantity(product.productId, -1)}
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 rounded-full"
                                            >
                                                <MinusCircle className="h-4 w-4" />
                                            </Button>
                                            {/* Quantity Display */}
                                            <span className="font-medium">{product.productQuantity}</span>
                                            {/* Increase Quantity */}
                                            <Button
                                                onClick={() => updateQuantity(product.productId, 1)}
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 rounded-full"
                                            >
                                                <PlusCircle className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    {/* Remove Item */}
                                    <Button
                                        onClick={() => {
                                            const updatedCart = cart.filter((item: any) => item.productId !== product.productId)
                                            localStorage.setItem('cart', JSON.stringify(updatedCart)) // Update localStorage
                                            setCart(updatedCart) // Update state
                                        }}
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Your cart is empty.</p>
                        )}
                    </CardContent>
                    {/* Footer */}
                    <CardFooter className="justify-between">
                        <h3 className="font-semibold">Total</h3>
                        <p className="font-semibold">
                            ${cart.reduce((total: number, item: any) => total + item.productPrice * item.productQuantity, 0)}
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default CartItemsBox
