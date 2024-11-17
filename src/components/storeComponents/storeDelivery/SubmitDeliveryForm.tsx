"use client"
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SubmitDeliveryForm = ({ userId, storeId }: { userId: string, storeId: string }) => {
    const router = useRouter()
    const [fullName, setFullName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [seucessMessage, setSuccessMessage] = useState(false)
    const handleSubmit = async (eo: React.FormEvent) => {
        eo.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post("http://localhost:3000/api/store/delivery", {
                username: fullName,
                useremail: email,
                phoneNumber,
                description: message,
                userId: userId,
                storeId: storeId
            })
            setIsLoading(false)
            const data = res.data
            console.log(data)
            setSuccessMessage(true)
            // setSuccessMessage(data.message)
        } catch (error) {
            setSuccessMessage(false)
            setIsLoading(false)
        }
    }

    return (
        <>
            {seucessMessage ? (
                <div className='flex justify-center items-center w-full h-full'>
                    <div className='p-5 border-2 rounded-md shadow-lg w-[500px]'>
                        <h1 className='text-center text-2xl text-green-400 '>
                            Thank you for your application!
                        </h1>
                        <p className='mt-5 text-muted-foreground text-sm'>
                            Your request to join as a delivery partner has been successfully submitted. Our team is currently reviewing your application, and we will get back to you shortly.
                            We appreciate your interest and look forward to the possibility of working together!
                        </p>
                        <div className='w-full justify-center items-center flex mt-5'>
                            <Link href="/" className={buttonVariants()}>Home Page</Link>
                        </div>
                    </div>
                </div>
            ) : (

                <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-[400px] rounded-sm border-2 shadow-lg p-5'>
                    <h1 className='text-4xl font-semibold text-center mb-6 ml-1 text-gray-700 mt-3'>Submit Job 🚴‍♀️</h1 >
                    <div className='flex flex-col gap-3'>
                        <Label className='text-gray-700' >Full Name:</Label>
                        <Input onChange={(eo) => setFullName(eo.target.value)} type='text' placeholder='full name' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Label className='text-gray-700'>Email:</Label>
                        <Input onChange={(eo) => setEmail(eo.target.value)} type='email' placeholder='email' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Label className='text-gray-700'>Phone Number:</Label>
                        <Input onChange={(eo) => setPhoneNumber(eo.target.value)} type='text' placeholder='+20 11111111111' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Label className='text-gray-700'>Message:</Label>
                        <Textarea onChange={(eo) => setMessage(eo.target.value)} placeholder='message (optionaly)'></Textarea>
                    </div>
                    <Button disabled={isLoading} type='submit'>Submit</Button>
                </form >
            )}
        </>
    )
}

export default SubmitDeliveryForm