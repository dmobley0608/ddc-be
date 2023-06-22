import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from './userSlice'
import styles from './Login.module.css'
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const handleSubmit=async(e)=>{
        e.preventDefault()
       let user = {email, password}
        dispatch(login(user))
    }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
        <input name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Email' required/>
        <input name='password' type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Password' required/>
        <input type="submit" />
    </form>
  )
}