import { useState, useEffect } from 'react'
import MainContainer from '../components/MainContainer'
import { useParams } from "react-router-dom"
import {
  Container, Paper, Button, TextField,
  Stack, IconButton
} from "@mui/material"

// #region ------------- [ ICONS ] -------------
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
// #endregion

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  return (
    <MainContainer>
      <Container maxWidth="md" sx={{ mt: 3, mb: 5 }}>
        <Paper>
          <Stack spacing={2}>
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
              <Button variant='contained' >Save</Button>
              <Button variant='outlined' >Cancel</Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </MainContainer>
  )
}

export default BlogDetail