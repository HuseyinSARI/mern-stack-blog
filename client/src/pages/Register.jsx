import { useState, useEffect } from 'react'
import {
  Grid, TextField, Button, Typography,
  Container, CssBaseline, Box, Avatar, InputAdornment, IconButton
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
// #region ------------ [ ICONS ] ----------------
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// #endregion 
import { useAuth } from "../middleware/contextHooks";
import { toast } from "react-toastify";


function Register() {
  const { registerUser, cleanErrors, toasts, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/blogs");

    if (toasts) {
      toasts.forEach(element => {
        toast(element.message,{
          type: element.type
        })
      });
    }


  }, [toasts, isAuthenticated, cleanErrors, navigate])

  const handleRegister = () => {
    const { firstName, lastName, email, password, confirmPassword } = user;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast("Please fill all fields",{type:"error"});
      return;
    }

    if (password !== confirmPassword) {
      toast("Passwords doesn't match",{type:"error"});
      return;
    }

    // ! we don't make email validation - do it yourself later

    toast("Registration successful", {type:"success"});

  }

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
              placeholder='Enter your first name'
              label="First Name"
              name='firstName'
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              placeholder='Enter your last name'
              label="Last Name"
              name="lastName"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder='Enter your email'
              label="Email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} >
            <TextField
              placeholder='Enter password'
              type={showPassword.password ? "text" : "password"}
              label="Password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}   // Toggle the password icon status
                    edge="end"
                  >
                    {showPassword.password ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder='Confirm password'
              type={showPassword.confirmPassword ? "text" : "password"}
              label="Confirm Password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}   // Toggle the password icon status
                    edge="end"
                  >
                    {showPassword.confirmPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}                  </IconButton>
                </InputAdornment>
              }}

            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          onClick={handleRegister}
        >
          Register
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/login">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Register