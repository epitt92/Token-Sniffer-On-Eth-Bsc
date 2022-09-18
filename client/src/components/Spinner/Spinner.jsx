import React from 'react';
import { RotateLoader } from 'react-spinners';

import Box from '@mui/material/Box';

const Spinner = () => {

  return (
    <Box height='100px' width='100px' display='flex' justifyContent='center' alignItems='center'>
      <RotateLoader color="#00A8E8" />
    </Box>
  )
}

export default Spinner
