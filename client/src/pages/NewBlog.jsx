import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useBlog } from "../middleware/contextHooks"
import { Transition } from "react-transition-group"
import { LoremIpsum } from "lorem-ipsum"
import { toast } from "react-toastify";
import { gsap } from "gsap"

import {
  Grid, Slider, TextField, Container,
  Button, Paper, Stack, Typography,
  FormControlLabel, Checkbox
} from "@mui/material"

// #region ------------ [ Components ] ------------
import MainContainer from "../components/MainContainer"
// #endregion

function NewBlog() {
  const navigate = useNavigate();
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });
  const { toasts, clearErrors, createBlog, blogs, getBlogs } = useBlog();

  useEffect(() => {

    if (!blogs) {
      getBlogs();
    }

    if (toasts) {
      toasts.forEach(element => {
        toast(element.message, { type: element.type })
      });

      clearErrors();
    }


  }, [toasts, clearErrors, blogs, getBlogs])

  const handleSave = () => {
    if (newBlog.title.length > 0 && newBlog.content.length > 0) {
      createBlog(newBlog)
    } else {
      toast("Please provide blog title and content", { type: "error" });
    }
  }

  return (
    <MainContainer>
      <Container maxWidth="md" sx={{ py: 2, my: 1, backgroundColor: "#D8D9CF" }} component={Paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label='Title' value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Content' value={newBlog.content}
              onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              multiline minRows={5} maxRows={20}
            />
          </Grid>
          <Grid item>
            <Stack spacing={2} direction="row">
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outlined" onClick={e => setNewBlog({ title: "", content: "" })}>Clear</Button>
              <Button onClick={() => navigate("/blogs")}>Cancel</Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </MainContainer>
  )
}

export default NewBlog