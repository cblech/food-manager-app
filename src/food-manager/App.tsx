import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
import React, { useState } from 'react';
import styles from './App.module.css';
import CheckOff from './CheckOffList';
import { FoodManagerModel } from './model/Data';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  let [model, setModel] = useState(new FoodManagerModel());

  let darkTheme = createTheme({
    palette: {
      mode: 'dark'
    },
    spacing: 8
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container className={styles.App}>
        <CheckOff model={model} setModel={setModel} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
