import { useState, useEffect } from 'react'
import {
  Grid, TextField, Button, Typography,
  CssBaseline, Box, Avatar, InputAdornment, IconButton, Paper
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

function Home() {
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
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item xs={false}
        sm={4}
        md={7}
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) => t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
      >
        <Box
          sx={{
            marginTop: 8, display: "flex", marginBottom: 10,
            flexDirection: "column", alignItems: "center", mx:4
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
      </Grid>

    </Grid>
  )
}

export default Home