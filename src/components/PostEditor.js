import {
    Button,
    Card,
    Link,
    Stack,
    TextField,
    Typography,
    IconButton,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { createPost } from "../api/posts";
  import ErrorAlert from "./ErrorAlert";
  import { isLoggedIn } from "../helpers/authHelper";
  import HorizontalStack from "./util/HorizontalStack";
  import UserAvatar from "./UserAvatar";
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
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      const errors = validate();
      setErrors(errors);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setLoading(true);
      const data = await createPost(formData, isLoggedIn());
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
      <Card sx={{ mx: 'auto', maxWidth: 600, mt: 3 }}>
        <Stack spacing={1}>
          {user && (
            <HorizontalStack spacing={2}>
              <UserAvatar width={30} height={30} username={user.username} />
              <Typography variant="h6">
                What are you thinking {user.username}?
              </Typography>
              <IconButton component={Link} to={"https://commonmark.org/help/"}>
              <MdHelpOutline />
              </IconButton>
            </HorizontalStack>
          )}
  
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              required
              name="title"
              margin="normal"
              onChange={handleChange}
              error={errors.title !== undefined}
              helperText={errors.title}
            />
            <TextField
              fullWidth
              label="Content"
              multiline
              rows={7}
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
              {loading ? <>Submitting</> : <>Submit</>}
            </Button>
          </Box>
        </Stack>
      </Card>
    );
  };
  
  export default PostEditor;