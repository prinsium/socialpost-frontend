  import {Button, Card, Stack, TextField, Typography, IconButton, Box,} from "@mui/material";
  import React, { useState, useRef } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { createPost } from "../api/posts";
  import ErrorAlert from "./ErrorAlert";
  import { isLoggedIn } from "../helpers/authHelper";
  import HorizontalStack from "./util/HorizontalStack";
  import { MdHelpOutline } from "react-icons/md"
  
  const PostEditor = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  

    const [formData, setFormData] = useState({
      title: "",
      content: "",
    });
  
    const [serverError, setServerError] = useState("");
    const [errors, setErrors] = useState({});
    const user = isLoggedIn();
    const file = useRef();

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      const errors = validate();
      setErrors(errors);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setLoading(true);
      const data = await createPost(formData,  isLoggedIn());
      setLoading(false);
      if (data && data.error) {
        setServerError(data.error);
      } else {
        navigate("/posts/" + data._id);
      }
    };
  
    const validate = () => {
      const errors = {};
  
      return errors;
    };
  
    return (
      <Card sx={{ maxWidth: 600, maxHeight: 500, p:2 }}>
        <Stack spacing={1}>
          {user && (
            <HorizontalStack spacing={2}>
              <IconButton component={Link} to={"https://commonmark.org/help/"}>
              <MdHelpOutline />
              </IconButton>
            </HorizontalStack>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Title"
              multiline
              minRows={1}
              maxRows={3}
              required
              name="title"
              margin="normal"
              onChange={handleChange}
              error={errors.title !== undefined}
              helperText={errors.title}
            />
            <TextField
              fullWidth
              variant="standard"
              placeholder="Content"
              multiline
              minRows={1}
              maxRows={6}
              name="content"
              margin="normal"
              onChange={handleChange}
              error={errors.content !== undefined}
              helperText={errors.content}
              required
            />
            <ErrorAlert error={serverError} />
            <Button
              variant="outlined"
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                mt: 2,
              }}
            >
              {loading ? <>Posting</> : <>Post</>}
            </Button>
          </Box>
        </Stack>
      </Card>
    );
  };
  
  export default PostEditor;