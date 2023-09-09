import React, { useContext, useEffect, useState } from 'react';
import userContext from '../context/userContext'
import { Link, useNavigate } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../Home.css'
//for alert messages
import toast from 'react-hot-toast';
import PostLoading from './PostLoading';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  // const [alert, setAlert] = useState({ type: "", text: "" })
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [postData, setPostData] = useState({ title: "", description: "", userId: "", posted_by: "" })
  const [post, setPost] = useState([])
  const { user, setUser } = useContext(userContext)
  const [sliceLength, setSliceLength] = useState(400); // Default value

  useEffect(() => {
    // Adjust slicing based on screen width
    if (window.innerWidth < 768) {
      setSliceLength(200);
    } else {
      setSliceLength(400);
    }

    // Update slicing when the window is resized
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSliceLength(200);
      } else {
        setSliceLength(400);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handelSubmit = async (event) => {
    // console.log(user)
    event.preventDefault();
    await setPostData({ ...postData, userId: user.id, posted_by: user.username })

    try {
      const res = await fetch(`https://blogs-backend-mha8.onrender.com/post/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(postData)
      })

      const result = await res.json()
      if (!result.error) {
        toast.success(result.message, {
          duration: 4000,
          position: 'top-center',
          iconTheme: {
            primary: '#ff7b00',
            secondary: 'white',
          },
        })
        console.log(result.message)
        setPostData({ title: "", description: "" })
        getPosts()
        setShowCreateModel(false)
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

  const getPosts = async () => {
    setIsLoading(true)
    try {

      const res = await fetch(`https://blogs-backend-mha8.onrender.com/post/all/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      })

      const result = await res.json();
      if (!result.error) {
        toast.success("Posts Refreshed Successfully", {
          duration: 2000,
          position: 'bottom-center',
          iconTheme: {
            primary: '#ff7b00',
            secondary: 'white',
          },
        })
        setPost(result.post)
        console.log(result.post)
        setIsLoading(false)
      } else {
        console.log(result.error)
      }
    } catch (error) {

    }
  }

  const deletePost = async (id) => {
    setIsLoading(true)
    try {
      const res = await fetch(`https://blogs-backend-mha8.onrender.com/post/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      })
      const result = await res.json();
      if (!result.error) {
        toast.success(result.message, {
          duration: 2000,
          position: 'top-center',
          iconTheme: {
            primary: '#ff7b00',
            secondary: 'white',
          },
        })
        getPosts()
        console.log(result.message)

      } else {
        console.log(result.error)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getPosts()
  }, [])



  return (
    <>
      <Modal
        show={showCreateModel}
        onHide={() => setShowCreateModel(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <Modal.Title id="title">
            Create New Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='label'>Title</Form.Label>
              <Form.Control type="text"
                className='input'
                required={true}
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                placeholder="Add your blog Title here..." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className='label'>Description</Form.Label>
              <Form.Control as="textarea"
                className='input'
                placeholder='Add your blogs here'
                required={true}
                value={postData.description}
                onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                rows={10} />
            </Form.Group>
          </Form>
          <div className="actions">
            <button type="button" className="cancel"
              onClick={() => { setShowCreateModel(false), setPostData({ title: "", description: "" }) }}
            >CANCEL</button>
            <button type="button"
              disabled={postData.title == "" || postData.description == ""}
              onClick={(e) => { handelSubmit(e) }}
              className="publish">Publish</button>
          </div>
        </Modal.Body>
      </Modal>
      <div className='container'>
        <div className='create'>
          <img src="search1.png" className="searchImage me-4" />
          <input className="form-control me-3"
            onChange={(e) => { setSearch(e.target.value) }}
            type="search....." placeholder="Search" aria-label="Search" />
          <a onClick={() => { setShowCreateModel(true) }}>
            <img className="post" src='./create.png'></img>
          </a>
        </div>
        {isLoading ? (<div className="loadingContainer"><PostLoading /></div>) :
          post && post.filter((post) =>
            post.title.toLowerCase().includes(search.toLowerCase())).map((post, index) =>
            (
              <div className="card" key={index}>
              <div className="header">
                <p>
                  <img src="user.png" alt="account" />
                  {post.posted_by}
                </p>
                <div>
                  <img
                    onClick={(e) => { deletePost(post.id) }}
                    src='./delete.png'></img>
                  <Link to={`/view/${post.id}`}>
                    <img src='./read.png' />
                  </Link>
                </div>
              </div>
              <p>
                {post.title}
              </p>
              <div className="content">
                <p>
                  {`${post.description.slice(0, sliceLength)}`}
                  <Link className='readMore' to={`/view/${post.id}`}> read more...</Link>
                </p>
              </div>
              </div>
            ))
        }

      </div>
    </>
  )
}

export default Home