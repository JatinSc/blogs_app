import React, { useContext, useState, useEffect } from 'react';
import '../register.css'
import { Link, useNavigate } from "react-router-dom"
import authContext from '../context/userContext'

const Register = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(authContext)
  const [data, setData] = useState({ username: "", email: "", password: "" })
  useEffect(() => {
    user && navigate('/', { replace: true })
  }, [])
  const handelSubmit = async (event) => {
    event.preventDefault()
    console.log(data)

    try {
      const res = await fetch(`http://127.0.0.1:3000/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ ...data })
      })
      const result = await res.json()

      if (!result.error) {
        setData({ username: "", email: "", password: "" })
        navigate('/login', { replace: true })
      } else {
        console.log(result.error)
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <>
      <div className="registerContainer">
       
        <form className="form" onSubmit={handelSubmit}>
        <h1>Blog <img src="blog.png"/> </h1>
          <p className="form-title">Create Account</p>
          <small>Get started with our app, just create an account and enjoy the experience.</small>
          <div className="input-container">
            <input value={data.username} type="text" onChange={(e) => setData({ ...data, username: e.target.value })} required={true} placeholder="Username" autoComplete="off" />
          </div>
          <div className="input-container">
            <input value={data.email} type="email" onChange={(e) => setData({ ...data, email: e.target.value })} required={true} placeholder="email" autoComplete="off" />
          </div>
          <div className="input-container">
            <input value={data.password} type="password" onChange={(e) => setData({ ...data, password: e.target.value })} required={true} placeholder="password" autoComplete="off" />
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
    </>
  )
}

export default Register