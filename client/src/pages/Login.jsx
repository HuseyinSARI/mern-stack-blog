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
import Copyright from "../components/Copyright"

function Login() {
  const { loginUser, cleanErrors, toasts, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/blogs");

    if (toasts) {
      toasts.forEach(element => {
        toast(element.message, {
          type: element.type
        })
      });
    }


  }, [toasts, isAuthenticated, cleanErrors, navigate])

  const handleLogin = () => {
    const { email, password } = user;

    if (!email || !password) {
      toast("Please fill all fields", { type: "error" });
      return;
    }

    loginUser(user);
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8, display: "flex", marginBottom: 10,
          flexDirection: "column", alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, backgroundColor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant='h5'>
          Login
        </Typography>
        <Grid container spacing={2} sx={{ mt: 3 }}>
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
              type={showPassword ? "text" : "password"}
              label="Password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}   // Toggle the password icon status
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              }}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/register">
             Don't have an account? Register
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright />
    </Container>
  )
}

export default Login