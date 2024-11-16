import React from 'react'
import { Button, buttonVariants } from '../ui/button'
import Link from 'next/link'
import { BarChart, Globe, Paintbrush, ShoppingBag, Zap } from 'lucide-react'
import { Lock } from 'lucide-react'
import { cookies } from 'next/headers'
import { verifyTokenForPage } from '@/utils/verifyToken'
import { JwtPayloadType } from '@/utils/types'

const HomePage = () => {
    const token = cookies().get("jwtToken")?.value
    const userPayload = verifyTokenForPage(token as string) as JwtPayloadType

    return (
        <main className="flex-1">
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                Create Your Dream Store in Our Marketplace
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                Launch your online business with complete customization and powerful features. Your success story starts here.
                            </p>
                        </div>
                        <div className="space-x-4">
                            <Link className={buttonVariants()} href={userPayload ? "/store" : "/user/register"}>Get Started</Link>
                            <Button variant="outline">Learn More</Button>
                        </div>
                    </div>
                </div>
            </section>
            {/*  Marketplace Features */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 rounded-lg dark:bg-gray-800">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                        Marketplace Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center">
                            <Paintbrush className="h-12 w-12 mb-4 text-primary" />
                            <h3 className="text-xl font-bold mb-2">Complete Customization</h3>
                            <p className="text-gray-500 dark:text-gray-400">Design your store exactly how you want it, with no limitations.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <Zap className="h-12 w-12 mb-4 text-primary" />
                            <h3 className="text-xl font-bold mb-2">Quick Setup</h3>
                            <p className="text-gray-500 dark:text-gray-400">Get your store up and running in minutes with our intuitive tools.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <Globe className="h-12 w-12 mb-4 text-primary" />
                            <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                            <p className="text-gray-500 dark:text-gray-400">Sell to customers worldwide with built-in international shipping.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <BarChart className="h-12 w-12 mb-4 text-primary" />
                            <h3 className="text-xl font-bold mb-2">Powerful Analytics</h3>
                            <p className="text-gray-500 dark:text-gray-400">Gain insights into your sales and customer behavior with detailed reports.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <Lock className="h-12 w-12 mb-4 text-primary" />
                            <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
                            <p className="text-gray-500 dark:text-gray-400">Keep your customers' data safe with our top-notch security measures.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <ShoppingBag className="h-12 w-12 mb-4 text-primary" />
                            <h3 className="text-xl font-bold mb-2">Multi-product Support</h3>
                            <p className="text-gray-500 dark:text-gray-400">Sell physical goods, digital products, or services all in one place.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Ready to Start Your Online Business?
                            </h2>
                            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                Join thousands of successful entrepreneurs who have launched their dreams with our marketplace.
                            </p>
                        </div>
                        <div className="w-full max-w-sm space-y-2">
                            <div className="flex space-x-2 justify-center">
                                <Link href="/user/register" className={buttonVariants()}>Register</Link>
                                <Link href="/user/login" className={buttonVariants({
                                    variant: "outline"
                                })}>Login</Link>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                By signing up, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default HomePage