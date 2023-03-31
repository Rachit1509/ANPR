import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import {currentCarData} from '../utils/firebase.js'
import { AppBar,Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'


function InputFile() {

  useEffect(() => {
    currentCarData();
  }, []);

  return (
    <div className="App">
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ANPR
          </Typography>
          <Button color="inherit"><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Current Data</Link></Button>
          <Button color="inherit"><Link to="/past-car-data" style={{ textDecoration: 'none', color: 'inherit' }}>Completed File</Link></Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default InputFile;
