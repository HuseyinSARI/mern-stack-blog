import { useState, useEffect } from 'react'
import MainContainer from '../components/MainContainer'
import { useBlog } from "../middleware/contextHooks";
import { toast } from "react-toastify";;

function BlogList() {
  const {getBlogs, toasts, clearErrors, blogs, clearCurrentBlog} = useBlog();
  
  const [myBlogs, setMyBlogs] = useState([]);


  useEffect(() => {
    if (!blogs) {
      getBlogs()
    }

    if (blogs) {
      setMyBlogs(blogs)
    }

    if (toasts) {
      toasts.forEach(ele => {
        toast(ele.message, { type: ele.type })
      });
      clearErrors();
    }

  }, [toasts, clearErrors, blogs, getBlogs])


  return (
    <MainContainer>
      {myBlogs.length}
    </MainContainer>
  )
}

export default BlogList