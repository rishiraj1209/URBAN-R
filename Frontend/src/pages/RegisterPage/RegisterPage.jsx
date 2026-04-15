import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
          name:"",
          email:"",
          password:"",
          role:"passenger"
      })

      const handleChange = (e)=>{
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]:value}))
      }

      const handleSubmit = async (e)=>{
        e.preventDefault();

        const {name, email, password, role} = formData;

        try {
          const res = await axios.post("http://localhost:3000/api/auth/signup",{
            name,
            email,
            password,
            role
          });

          const {token, role:userRole} = res.data;

          localStorage.setItem("token",token);
          localStorage.setItem("role",userRole);

          if(userRole === "admin"){
              navigate("/adminDashboard")
          }else if(userRole === "driver"){
              navigate("/driverDashboard")
          }else if(userRole === "passenger"){
              navigate("/complaints")
          }
        } catch (error) {
          console.log(error);
          alert("signup failed")
        }

        
      }
    return (
      <div className='bg-linear-to-b from-neutral-200 via-neutral-300 to-neutral-200 h-screen py-40'>
        <form onSubmit={handleSubmit} className='border border-gray-300 max-w-85 mx-auto p-8 shadow-lg shadow-black rounded-lg bg-white'>
          <h2 className='text-center text-2xl font-bold mb-12 text-neutral-800'>Sign Up</h2>
          <div className='flex items-center rounded gap-1 bg-indigo-500/5 border border-gray-500/25 p-2 my-2'>
            <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.125 13.125a4.375 4.375 0 0 1 8.75 0M10 4.375a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" stroke="#6B7280" stroke-opacity=".6" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input className='outline-none bg-transparent w-full text-gray-600' type="text" placeholder='Username' name='name' value={formData.name} onChange={handleChange} />
          </div>

          <div className='flex items-center rounded gap-1 bg-indigo-500/5 border border-gray-500/25 p-2 my-2'>
            <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375" stroke="#6B7280" stroke-opacity=".6" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z" stroke="#6B7280" stroke-opacity=".6" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
            <input className='outline-none bg-transparent w-full text-gray-600' type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange}/>
          </div>

          <div className='flex items-center rounded gap-1 bg-indigo-500/5 border border-gray-500/25 p-2 my-2'>
            <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375" stroke="#6B7280" stroke-opacity=".6" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z" stroke="#6B7280" stroke-opacity=".6" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
            <input className='outline-none bg-transparent w-full text-gray-600' type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange}/>
          </div>

          <div className="my-4">
            <div className="flex gap-6 text-gray-600">

                <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="role"
                    value="driver"
                    checked={formData.role === "driver"}
                    onChange={handleChange}
                    className='cursor-pointer accent-indigo-500/90'
                />
                Driver
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === "admin"}
                    onChange={handleChange}
                    className='cursor-pointer accent-indigo-500/90'
                />
                Admin
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="role"
                    value="passenger"
                    checked={formData.role === "passenger"}
                    onChange={handleChange}
                    className='cursor-pointer accent-indigo-500/90'
                />
                Passenger
                </label>

            </div>
          </div>
  
          <button type='submit' className='w-full mb-6 mt-2 rounded py-2 px-8 text-white cursor-pointer bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 font-medium'>Sign Up</button>
          <p className='text-center text-gray-600'>Already have an account? <Link className='text-blue-500 underline' to="/login">Login</Link></p>
        </form>
      </div>
    )
}

export default RegisterPage
