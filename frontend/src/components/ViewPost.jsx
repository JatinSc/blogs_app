import React, { useEffect, useState } from 'react'
import { useParams , Link} from 'react-router-dom'
import Loading from './Loading'
import '../App.css'
import '../ViewPost.css'

const ViewPost = () => {
  const [data,setData] = useState()
  const [isLoading , setIsLoading] = useState(false)
  const {id} = useParams()

  const getPosts = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`https://blogs-backend-mha8.onrender.com/post/view/${id}`, {
        method: "GET", 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
      const result = await res.json()
      if(!result.error){
        console.log(result.post)
        setData(result.post)
        setIsLoading(false)
      }else{
        console.log(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getPosts()
  },[])
  return (
   <>
   {
    isLoading ? (<div className='loadingContainer'><Loading/></div>) : (<div>
    {data && (<>
    <div className='view'>
      <p>{data.title}</p>
      <div>
      <p>{data.description}</p>
      <p>Published By : {data.posted_by}</p>
      <p>{data.createdAt.split("T")[0]}</p>
      </div>
      <Link to={`/`}><button className='back'>Go Back</button></Link>
    </div>
    </>)}
    </div>)
   }
   </>
  )
}

export default ViewPost