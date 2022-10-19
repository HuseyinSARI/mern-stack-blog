import { useState, useEffect } from 'react'
import {
  Grid, Typography, Button,
  Container, Stack, Tooltip,
  Box, List, ListItemText, Paper, ListItem
} from "@mui/material"
import Masonry from '@mui/lab/Masonry';
import { Link, useNavigate } from 'react-router-dom';
import MainContainer from '../components/MainContainer'
import { useBlog } from "../middleware/contextHooks";
import { toast } from "react-toastify"; import blogReducer from '../context/blog_context/blogReducer';
import BlogCard from '../components/BlogCard';

function BlogList() {
  const { getBlogs, toasts, clearErrors, blogs, clearCurrentBlog } = useBlog();
  const navigate = useNavigate();
  const [myBlogs, setMyBlogs] = useState([]);


  useEffect(() => {

    getBlogs()


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
      <Container maxWidth="lg" sx={{ py: 1, my: 1 }} >
        <Grid container spacing={2}>
          <Grid item xs={false} md={3}>
            <Stack spacing={2} sx={{ display: "flex" }} direction="row">
              <Box sx={{ flexGrow: 1 }} />
              <Button fullWidth={false} onClick={() => navigate("/newBlog")}> Create Blog </Button>
            </Stack>
            <List sx={{ backgroundColor: "silver", borderRadius: 5, mt: 3 }}>
              {myBlogs?.map(blog => (
                <Link key={blog._id} to={`/blogs/${blog._id}`}>
                  <ListItem>
                    <Tooltip title={blog.title} placement="right">
                      <ListItemText primary={blog.title} />
                    </Tooltip>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={9}>
            <Masonry columns={2}>
              {myBlogs?.map(blog => (
                <BlogCard blog={blog} key={blog._id} />
              ))}
            </Masonry>
          </Grid>
        </Grid>
      </Container>
    </MainContainer>
  )
}

export default BlogList