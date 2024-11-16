"use client"
import React from 'react'
import Link from 'next/link'
const StoreFooter = ({ storeId }: {storeId: string}) => {
    return (
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
                        <li><Link href={`/store/delivery-job/${storeId}`} className="text-muted-foreground hover:text-foreground">Work as a delivery representative</Link></li>
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
    )
}

export default StoreFooter