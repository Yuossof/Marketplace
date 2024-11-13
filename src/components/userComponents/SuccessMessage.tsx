import React from 'react'
import { CheckCircleIcon } from 'lucide-react'
const SuccessMessage = () => {
  return (
    <div className='w-full h-10 bg-[#cff3e0] text-green-500 flex items-center gap-2 pl-3 rounded-sm'>
        <CheckCircleIcon className='w-5 h-5'/>
        <h1 className='text-[17px]'>Success</h1>
    </div>
  )
}

export default SuccessMessage