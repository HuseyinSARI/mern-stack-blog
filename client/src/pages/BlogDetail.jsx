import { useState, useEffect } from 'react'
import MainContainer from '../components/MainContainer'
import { useParams, useNavigate } from "react-router-dom"
import {
  Container, Paper, Button, TextField,
  Stack, IconButton, Typography
} from "@mui/material"

// #region ------------- [ ICONS ] -------------
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
// #endregion

import { toast } from "react-toastify"
import { useBlog } from "../middleware/contextHooks";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentBlog, getBlogById, toasts, clearToasts,
    deleteBlog, updateBlog, blogs, getBlogs
  } = useBlog();
  const [edit, setEdit] = useState(false)
  const [blog, setBlog] = useState(null);
  const [temp, setTemp] = useState(null)

  useEffect(() => {

    if (!blogs) {
      getBlogs()
    }

    // if we have no blog or if our blog isn't the right one
    if (!currentBlog || currentBlog._id !== id) {
      getBlogById(id);
    }

    if (currentBlog?._id === id) {
      setBlog(currentBlog);
    }

    if (toasts) {
      toasts.forEach(element => {
        toast(element.message, { type: element.type })
      });
    }


  }, [currentBlog, id, toasts, clearToasts, getBlogById, getBlogs, blogs])

  const handleEdit = () => {
    setEdit(true);
    setTemp(blog);
  }

  const handleCancel = () => {
    setEdit(false);
    setBlog(temp);
  }

  const handleDelete = () => {
    deleteBlog(blog._id);
    navigate("/blogs");
  }

  const handleUpdate = () => {
    updateBlog(blog);
    setEdit(false);
    setTemp(null);
  }

  const displayDisabled = () => {
    return (
      <Stack spacing={2}>
        <Stack spacing={2} direction="row">
          <Typography variant='h5' sx={{ flexGrow: 3 }} >{blog?.title}</Typography>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteForeverIcon />
          </IconButton>
        </Stack>
        <Typography variant='p'>{blog?.content}</Typography>
      </Stack>
    )
  }

  return (
    <MainContainer>
      <Container maxWidth="md" sx={{ mt: 3, mb: 5 }}>
        <Paper sx={{ backgroundColor: edit ? "#CDFCF6" : "" }}>
          {!edit
            ? displayDisabled()
            : <Stack spacing={2}>
              <TextField
                label="Title" name='title' value={blog?.title}  // ! ? ekleyerek "cannot read null" hatasını giderdik
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              />
              <TextField
                label="Content" name='content' value={blog?.content}
                onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                multiline minRows={5} maxRows={20}
              />

              <Stack spacing={2} direction="row">
                <Button variant='contained' onClick={handleUpdate}>Update</Button>
                <Button variant='outlined' onClick={handleCancel}>Cancel</Button>
              </Stack>
            </Stack>
          }
        </Paper>
      </Container>
    </MainContainer >
  )
}

export default BlogDetail