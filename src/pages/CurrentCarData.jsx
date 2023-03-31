import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import {currentCarData} from '../utils/firebase.js'
import { Link } from 'react-router-dom'
import { AppBar,Typography,Box, Toolbar,Button, Paper} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import  currentCarDataFile  from '../utils/current-car-data.jsx'


const columns = [
  { field: 'id', headerName: 'S No.', width: 50 },
  { field: 'carNo', headerName: 'Car No', width: 120 },
  { field: 'createdDate', headerName: 'Created Date', width: 110 },
  { field: 'PUCValidity', headerName: 'PUC Validity', width: 160 },
  { field: 'TaxValidity', headerName: 'Tax Validity', width: 160 },
  { field: 'InsuranceValidity', headerName: 'Insurance Validty', width: 160 },
  { field: 'Completed', headerName: 'Completed', width: 100 },
];

function CurrentCarData() {

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
            <Button color="inherit"><Link to="/past-car-data" style={{ textDecoration: 'none', color: 'inherit' }}>Completed Data</Link></Button>
            <Button color="inherit"><Link to="/input-file" style={{ textDecoration: 'none', color: 'inherit' }}>Input File</Link></Button>
          </Toolbar>
        </AppBar>
        <Paper elevation={3} className="survey-card" >
          <Box sx={{ marginTop: "7.5%" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Current Car Data</Typography>
            <DataGrid
              autoHeight 
              rows={currentCarDataFile}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              density="compact"
            />
          </Box>
        </Paper>
    </div>
  )
}

export default CurrentCarData;
