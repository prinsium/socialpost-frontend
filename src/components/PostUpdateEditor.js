import { Box, Button, Stack, TextField, Modal } from "@mui/material";
import React, { useState } from "react";

const style = {
  position: 'absolute',
  minWidth: 200,
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

const PostUpdateEditor = (props) => {
  const [title, setTitle] = useState(props.originalTitle);
  const [content, setContent] = useState(props.originalContent);
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange1 = (e) => {
    setTitle(e.target.value);
  };

  const handleChange2 = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;
    let error = null;

    if (props.validate) {
      error = props.validate(content && title);
    }

    if (error && error.length !== 0) {
      setError(error);
    } else {
      props.handleSubmit(e);
    }
  };

  return (
      <Box sx={{style}}>
    <Box component="form" onSubmit={handleSubmit}>
      <Stack>
        <TextField
          value={title}
          fullWidth
          margin="normal"
          name="title"
          onChange={handleChange1}
          error={error.length !== 0}
          helperText={error}
          multiline
        />
        <TextField
          value={content}
          fullWidth
          margin="normal"
          name="content"
          onChange={handleChange2}
          error={error.length !== 0}
          helperText={error}
          multiline
        />
        <Button
          type="submit"
          variant="outlined"
          sx={{ mt: 1 }}
        >
          Update
        </Button>
      </Stack>
    </Box>
    </Box>
  );
};

export default PostUpdateEditor;