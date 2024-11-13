"use client"
import { useState } from 'react'
import { Button } from '../ui/button'
import axios from "axios"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SuccessMessage from './SuccessMessage'
import ErrorMesasge from './ErrorMesasge'

const RegisterForm = () => {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [successMessage, setSuccessMessage] = useState<boolean>(false)
    const [errMessageStr, seterrMessageStr] = useState("")
    const [errMessage, seterrMessage] = useState(false)
    const handleSubmit = async (eo: React.FormEvent) => {
        eo.preventDefault()
        try {
            setIsLoading(true)
            await axios.post("http://localhost:3000/api/user/register", {
                name: username,
                email: email,
                password: password
            })
            setIsLoading(false)
            setSuccessMessage(true)
            seterrMessage(false)
            setTimeout(()=>{
                router.push("/")
            }, 2000)
            
        } catch (error) {
            setIsLoading(false)
            seterrMessage(true)
            setSuccessMessage(false)
            seterrMessageStr(error.response?.data?.message)
        }
    }
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='py-6 px-5 bg-white rounded-xl border-2 shadow-xl'>
                <h1 className='text-4xl text-center font-semibold text-gray-600 mr-3'>🔐Register</h1>
                <form className='flex flex-col gap-4 mt-10' onSubmit={handleSubmit}>
                    {/* <div className='flex flex-col gap-2 items-start'> */}
                        <label>
                            Name
                        </label>
                        <input value={username} onChange={(eo)=> setUsername(eo.target.value)} className='border-[1px] border-gray-400 w-[350px] h-[40px] pl-5 rounded-lg outline-gray-600 outline-[1px]' type="text" placeholder='Jhone' />
                    {/* </div> */}
                    {/* <div className='flex flex-col gap-2 items-start'> */}
                        <label>
                            Email
                        </label>
                        <input value={email} onChange={(eo)=> setEmail(eo.target.value)} className='border-[1px] border-gray-400 w-[350px] h-[40px] pl-5 rounded-lg outline-gray-600 outline-[0.5px]' type="email" placeholder='Jhone@due.com' />
                    {/* </div> */}
                    {/* <div className='flex flex-col gap-2 items-start'> */}
                        <label>
                            Password
                        </label>
                        <input value={password} onChange={(eo)=> setPassword(eo.target.value)} className='border-[1px] border-gray-400 w-[350px] h-[40px] pl-5 rounded-lg outline-gray-600 outline-[0.5px]' type="password" placeholder='******' />
                    {/* </div> */}
                    {successMessage && <SuccessMessage />}
                    {errMessage && <ErrorMesasge errMessageStr={errMessageStr}/>}
                    <Button disabled={isLoading} type='submit' className="mt-4" size="sm">Register</Button>
                </form>
                <div className='flex items-center mt-3 gap-2 ml-2'>
                  <span className='text-gray-600'>you have an accout?</span> 
                  <Link className='text-blue-700' href="/user/login">sign in</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm