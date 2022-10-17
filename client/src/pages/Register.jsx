import { useState } from 'react'
import {
  Grid, TextField, Button, Typography,
  Container, CssBaseline, Box, Avatar
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

// ------------------ [ Icons ]------------------
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

// ----------------------------------------------

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8, display: "flex",
          flexDirection: "column", alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, backgroundColor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant='h5'>
          Register
        </Typography>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="First Name"
              name='firstName'
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              size='small'
              label="Last Name"
              name="lastName"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Register