"use client"
import { ShoppingCartIcon } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "@radix-ui/react-separator"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import Image from "next/image"
import hippoIm from "../../public/hippo-empty-cart.png"

const Cart = () => {
    const itemCount = 0
  return (
    <Sheet>
        <SheetTrigger className="group -m-2 flex items-center p-2">
            <ShoppingCartIcon aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"/>
            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                0
            </span>
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
            <SheetHeader className="space-y-2.5 pr-6">
                <SheetTitle className="text-center">
                  Cart (0)
                </SheetTitle>
            </SheetHeader>
            {itemCount > 0 ? (
                    <>
                      <div className="flex w-full flex-col pr-6">
                        Cart item
                      </div>
                      <div className="space-y-4 pr-6">
                        <Separator className="border-[1px] "/>
                        <div className="space-y-1.5 pr-6">
                            <div className="flex">
                                <span className="flex-1">Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex">
                                <span className="flex-1">Transaction Fee</span>
                                <span>{formatPrice("199", {currency: "USD", notation: "standard"})}</span>
                            </div>
                            <div className="flex">
                                <span className="flex-1">Total</span>
                                <span>{formatPrice(200)}</span>
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetTrigger asChild>
                                <Link href="/cart" className={buttonVariants({
                                    className: "w-full"
                                })}>
                                   Continue to Checkout 
                                </Link>
                            </SheetTrigger>
                        </SheetFooter>
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center space-y-1">
                        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
                            <Image src={hippoIm} fill alt="empty!"/>
                        </div>
                        <div className="text-xl font-semibold text-gray-600">Your cart is empty!</div>
                        <SheetTrigger asChild>
                            <Link href="/products" className={buttonVariants({
                                variant: "link",
                                size: "sm",
                                className: "text-sm text-muted-foreground"
                            })}>
                                Add items to your cart to checkout
                            </Link>
                        </SheetTrigger>
                    </div>
                  )}
        </SheetContent>
    </Sheet>
  )
}

export default Cart