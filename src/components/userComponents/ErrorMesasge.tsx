import React from 'react'
import { InfoIcon } from 'lucide-react'
interface Props {
    errMessageStr: string
}
const ErrorMesasge = ({errMessageStr}: Props) => {
  return (
    <div className='w-full h-10 bg-[#cff3e0] text-red-500 flex items-center gap-2 pl-3 rounded-sm'>
        <InfoIcon className='w-5 h-5'/>
        <h1 className='text-[15px]'>{errMessageStr}</h1>
    </div>
  )
}

export default ErrorMesasge