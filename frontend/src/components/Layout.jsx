import React , {useContext, useEffect, useState} from 'react';
import userContext from '../context/userContext'
import {Link, useNavigate} from "react-router-dom"
import '../App.css'

const Layout = ({children}) => {
    const navigate = useNavigate()
  const {user , setUser} = useContext(userContext)

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><Link to={`/`}><img src="./blog.png"/></Link> Blogs</a>
                    <button className="navbar-toggler m-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                   { user && <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex ms-auto">
                            <img src="./logout.png"
                                onClick={(e) => { setUser(null), localStorage.clear(), navigate('/login', { replace: true }) }}
                            />
                        </form>
                    </div>}
                </div>
            </nav>
            {children}
        </>
    )
}

export default Layout