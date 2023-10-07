import { Box, styled, Typography, Link } from "@mui/material";
import React from "react";

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const MaterialUIText = styled(Typography)(({ theme }) => ({ 
  fontSize: 30,
  background: "-webkit-linear-gradient(45deg, #51ff8e 40%, #3300ff 20%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent" 
}))

const Copyright = () => {
  return (
      <Box sx={{display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'space-between'}}>
         <Box>
      <Link href="/" underline="hover">
      <MaterialUIText> Capybaras</MaterialUIText>
      </Link></Box>
      <Box sx={{ flexDirection: 'row-reverse' }}>
       <span className='d-flex gap-xxs'>
          <a
            href='https://github.com/prinsium'
            target='_blank'
            rel='noreferrer'>
            <GitHubIcon />
          </a>
          <a
            href='https://linkedin.com/in/princetrivedi'
            target='_blank'
            rel='noreferrer'>
            <LinkedInIcon />
          </a>
        </span>
      </Box>
      </Box>
  );
};

export default Copyright;
