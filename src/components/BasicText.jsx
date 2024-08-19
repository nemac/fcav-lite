import React from 'react';
import { Paper, Typography } from '@mui/material';

const BasicText = ( props ) => {
  const { text } = props;
  return (
    <Paper
        elevation={0}
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          padding: 1,
          borderRadius: 1,
        }}
    >
        <Typography variant="body2">{text}</Typography>
    </Paper>
  );
};

export default BasicText;