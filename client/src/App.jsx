import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Home from 'views/Home';

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      </BrowserRouter>          
    </ThemeProvider>
  );
}

export default App;
