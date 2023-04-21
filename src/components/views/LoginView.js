  import {Box, Button, Container, Stack, styled, TextField, Typography, Link} from "@mui/material"; 

  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { login } from "../../api/users";
  import ErrorAlert from "../ErrorAlert";
  import { loginUser } from "../../helpers/authHelper";

  const MaterialUIText = styled(Typography)(({ theme }) => ({ 
    fontSize: 50,
    background: "-webkit-linear-gradient(45deg, #51ff8e 40%, #3300ff 20%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent" 
  }))
  
  const LoginView = () => {
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const [serverError, setServerError] = useState("");
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const data = await login(formData);
      if (data.error) {
        setServerError(data.error);
      } else {
        loginUser(data);
        navigate("/");
      }
    };
  
    return (
      <Container maxWidth={"xs"} sx={{ mt: 6 }}>
        <Stack alignItems="center">
      <Box sx={{m:2}}>
      <Link href="/" underline="hover">
      <MaterialUIText> Capybaras</MaterialUIText>
      </Link>
      </Box>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <Typography>
            Don't have an account yet? <Link href="/signup">Sign Up</Link>
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              fullWidth
              margin="normal"
              autoComplete="email"
              autoFocus
              required
              id="email"
              name="email"
              onChange={handleChange}
            />
            <TextField
              label="Password"
              fullWidth
              required
              margin="normal"
              id="password  "
              name="password"
              onChange={handleChange}
              type="password"
            />
  
            <ErrorAlert error={serverError} />
            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              Login
            </Button>
          </Box>
        </Stack>
      </Container>
    );
  };
  
  export default LoginView;