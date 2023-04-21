  import { Box, Button, Container, Stack, styled, TextField, Typography, Link, Alert, } from "@mui/material";
  import React, { useState } from "react";
  import { signup } from "../../api/users";
  import { loginUser } from "../../helpers/authHelper";
  import { useNavigate } from "react-router-dom";
  import ErrorAlert from "../ErrorAlert";
  import { isLength, isEmail, contains } from "validator";

  const MaterialUIText = styled(Typography)(({ theme }) => ({ 
    fontSize: 50,
    background: "-webkit-linear-gradient(45deg, #51ff8e 40%, #3300ff 20%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent" 
  }))
  
  const SignupView = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const [errors, setErrors] = useState({});
  
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const errors = validate();
      if (Object.keys(errors).length !== 0) return;
  
      const data = await signup(formData);
  
      if (data.error) {
        setServerError(data.error);
      } else {
        loginUser(data);
        navigate("/");
      }
    };
  
    const validate = () => {
      const errors = {};
  
      if (!isLength(formData.username, { min: 4, max: 30 })) {
        errors.username = "Must be between 4 and 30 characters long";
      }
  
      if (contains(formData.username, " ")) {
        errors.username = "Must contain only valid characters";
      }
  
      if (!isLength(formData.password, { min: 8 })) {
        errors.password = "Must be at least 8 characters long";
      }
  
      if (!isEmail(formData.email)) {
        errors.email = "Must be a valid email address";
      }
  
      setErrors(errors);
  
      return errors;
    };
  
    return (
      <Container maxWidth={"xs"} sx={{ mt: { xs: 2, md: 6 } }}>
        <Stack alignItems="center">
        <Box sx={{m:2}}>
        <Link href="/" underline="hover">
        <MaterialUIText> Capybaras</MaterialUIText>
        </Link>
        </Box>
          <Typography variant="h5" gutterBottom>
            Sign Up
          </Typography>
          <Typography> Already have an account? <Link href="/login">Login</Link> </Typography>
            
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              autoFocus
              required
              id="username"
              name="username"
              onChange={handleChange}
              error={errors.username !== undefined}
              helperText={errors.username}
            />
            <TextField
              label="Email Address"
              fullWidth
              margin="normal"
              autoComplete="email"
              required
              id="email"
              name="email"
              onChange={handleChange}
              error={errors.email !== undefined}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              fullWidth
              required
              margin="normal"
              autoComplete="password"
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              error={errors.password !== undefined}
              helperText={errors.password}
            />
            <ErrorAlert error={serverError} />
            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              Sign Up
            </Button>
          </Box>
        </Stack>
      </Container>
    );
  };
  
  export default SignupView;