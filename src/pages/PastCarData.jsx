import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import {pastCarData} from '../utils/firebase.js'
import { AppBar,Typography,Box, Toolbar,Button } from '@mui/material'
import {Link} from 'react-router-dom'

function PastCarData() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    pastCarData();
  }, []);

  return (
    <div className="App">
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ANPR
          </Typography>
          <Button color="inherit"><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Current Data</Link></Button>
          <Button color="inherit"><Link to="/input-file" style={{ textDecoration: 'none', color: 'inherit' }}>Input File</Link></Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default PastCarData;
