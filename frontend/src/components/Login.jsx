import React, { useContext, useEffect, useState } from 'react';
import '../register.css';
import { Link, useNavigate } from "react-router-dom";
import userContext from '../context/userContext'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(userContext)
  const [data, setData] = useState({ email: "", password: "" })
  // useEffect(()=>{
  //   user&&navigate('/',{replace:true})
  // }, [])
  const handelSubmit = async (event) => {
    event.preventDefault()
    // console.log(data)
    try {
      const res = await fetch(`https://blogs-backend-mha8.onrender.com/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ ...data })
      })
      const result = await res.json()

      if (!result.error) {
        toast.success(result.message, {
          duration: 3000,
          position: 'top-center',
          iconTheme: {
            primary: '#ff7b00',
            secondary: 'white',
          },
        })
        setData({ email: "", password: "" })
        localStorage.setItem("token", result.token)
        setUser(result.user)
        console.log(result.message)
        navigate('/', { replace: true })

      } else {
        console.log(result.error)
        toast.error(result.error, {
          duration: 5000,
          position: 'top-center',
          iconTheme: {
            primary: '#ff7b00',
            secondary: 'white',
          },
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="registerContainer">
    
        <form className="form" onSubmit={handelSubmit}>
          <h1>Blogs <img src="blog.png" /> </h1>
          <p className="form-title">Login to your Account</p>
          <small>Get started with our app, just Login to your account and enjoy the experience.</small>
          <div className="input-container">
            <input value={data.email} type="email" onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="email" autoComplete="off" autoFocus={true} />
          </div>
          <div className="input-container">
            <input value={data.password} type="password" onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="password" autoComplete="off" />
          </div>
          <button type="submit" className="submit">
            Sign in
          </button>

          <p className="signup-link">
            Don't have an account ?
            <Link to="/register"> Sign up here!</Link>
          </p>
        </form>
      </div>
    </>
  )
}


export default Login