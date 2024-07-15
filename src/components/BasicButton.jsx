import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function BasicButton(props) {
  const { icon, label, onClick } = props;
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" endIcon={icon} onClick={onClick}>
        {label}
      </Button>
    </Stack>
  );
}