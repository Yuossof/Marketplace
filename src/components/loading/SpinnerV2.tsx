import React from 'react'
import '../storeComponents/animate.css'
const SpinnerV2 = () => {
  return (
    <div className='w-[200px] h-3 relative border-[2px] duration-300 rounded-md'>
        <span id='spanAnim' className=' absolute left-0 bg-blue-600 rounded-md w-8 h-full'></span>
    </div>
  )
}

export default SpinnerV2