import React from 'react'
import './loading.css'
const LoadinBar = () => {
    return (
        <div className="loader">
            <label className='LoadingLabel'>Please wait...</label>
            <div className="loading"></div>
        </div>
    )
}

export default LoadinBar