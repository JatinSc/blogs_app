import React, { useContext, useState, useEffect } from 'react';
import '../register.css'
import { Link, useNavigate } from "react-router-dom"
import userContext from '../context/userContext'
import toast, { Toaster } from 'react-hot-toast';
import Loading from './Loading';

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ username: "", email: "", password: "" })
  // useEffect(() => {
  //   user && navigate('/', { replace: true })
  // }, [])
  const handelSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    console.log(data)

    try {
      const res = await fetch(`https://blogs-backend-mha8.onrender.com/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ ...data })
      })
      const result = await res.json()

      if (!result.error) {
        toast.success(result.message, {
          duration: 1000,
          position: 'top-center',
          iconTheme: {
            primary: '#ff7b00',
            secondary: 'white',
          },
        })
        setLoading(false)
        navigate('/login', { replace: true })
        setData({ username: "", email: "", password: "" })
        set
      } else {
        setLoading(false)
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
      {
        loading ? 
          <div className='registerContainer'>
            <Loading />
          </div>
          : (
          <div className="registerContainer">
            <form className="form" onSubmit={handelSubmit}>
              <h1>Blogs <img src="blog.png" /> </h1>
              <p className="form-title">Create Account</p>
              <small>Get started with our app, just create an account and enjoy the experience.</small>
              <div className="input-container">
                <input value={data.username} type="text" onChange={(e) => setData({ ...data, username: e.target.value })} placeholder="Username" autoComplete="off" />
              </div>
              <div className="input-container">
                <input value={data.email} type="email" onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="email" autoComplete="off" />
              </div>
              <div className="input-container">
                <input value={data.password} type="password" onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="password" autoComplete="off" />
              </div>
              <button type="submit" className="submit">
                Sign up
              </button>

              <p className="signup-link">
                Already have an account ?
                <Link to="/login"> Sign in</Link>
              </p>
            </form>
          </div>
        )
      }

    </>
  )
}

export default Register