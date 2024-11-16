import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
const SubmitDeliveryForm = () => {
    return (
        <form className='flex flex-col gap-4 w-[400px] rounded-sm border-2 shadow-lg p-5'>
            <h1 className='text-4xl font-semibold text-center mb-6 ml-1 text-gray-700 mt-3'>Submit Job 🚴‍♀️</h1>
            <div className='flex flex-col gap-3'>
                <Label className='text-gray-700' >Full Name:</Label>
                <Input type='text' placeholder='full name' />
            </div>
            <div className='flex flex-col gap-3'>
                <Label className='text-gray-700'>Email:</Label>
                <Input type='email' placeholder='email' />
            </div>
            <div className='flex flex-col gap-3'>
                <Label className='text-gray-700'>Phone Number:</Label>
                <Input type='text' placeholder='+20 11111111111' />
            </div>
            <div className='flex flex-col gap-3'>
                <Label className='text-gray-700'>Message:</Label>
                <Textarea placeholder='message (optionaly)'></Textarea>
            </div>
            <Button>Submit</Button>
        </form>
    )
}

export default SubmitDeliveryForm