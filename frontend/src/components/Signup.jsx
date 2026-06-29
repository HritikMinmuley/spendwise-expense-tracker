import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Logo } from './shared/Logo'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import api from "../lib/axios"
import { toast } from 'sonner'

const Signup = () => {
    const [input,setInput] = useState({
        fullname: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const changeHandler = (e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    const submitHandler = async(e)=>{
        e.preventDefault();
        try {
            const res = await api.post("/user/register",input,{
                headers:{
                    'Content-Type':'application/json'
                },
              
            });
            console.log(res);
            if(res.data.success){
                toast.success(res.data.message); 
                navigate('/login');
            }
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
        
    }

    return (
        <div className='flex items-center justify-center w-screen h-screen'>

            <form onSubmit={submitHandler} className='w-96 p-8 shadow-lg'>

            <div className='w-full flex justify-center mb-5'>
                <Logo/>
            </div>
                <div>
                    <Label className='m-1'>Full Name</Label>
                    <Input
                        type="text"
                        name="fullname"
                        value={input.fullname}
                        onChange = {changeHandler}
                    />
                </div>
                <div>
                    <Label className='m-1'>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange = {changeHandler}
                    />
                </div>
                <div>
                    <Label className='m-1'>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange = {changeHandler}
                    />
                </div>
                <Button className="w-full my-5">Signup</Button>
                <p className='text-sm text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Login</Link></p>
            </form>
        </div>
    )
}

export default Signup