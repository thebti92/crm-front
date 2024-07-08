import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import toast, { Toaster } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode'



import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://digidco.com/">
        DIGID
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginView({ setToken , setUserToken}) {


  // Handle the submit ---------------

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    console.log("Login info :",email,password);  
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        "email": email,
        "password": password
    });
  
    console.log("Response DATA login-view : ",response.data);
      // Assuming the server returns a success message or a token upon successful login
      // You can customize this part based on your server response
    
    
      if (response.data.status === "200" && response.data.message.token) {
       
        console.log("SUCCESS Login-view !", response.data.message);
        localStorage.setItem('token', response.data.message.token);
     
        setToken(response.data.message.token);
        const DecodeToken = jwtDecode(response.data.message.token);
      setUserToken({
        name: DecodeToken.user_name,
        role: DecodeToken.user_role,

        email: DecodeToken.user_email,
        phone: DecodeToken.user_phone,
      });


      
        toast.success('Login success');
        navigate('/');
      } else {
        // Handle login failure
   //     toast.error(response.data.message);
        console.log('Login failed');
      }
    } catch (error) {
      // Handle error
      console.error('Error occurred:', error);
      toast.error(error.response.data.message);
      
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {/* Forgot password? */}
                </Link>
              </Grid>
              <Grid item>
                
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>

              </Grid>
            </Grid> 



          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}