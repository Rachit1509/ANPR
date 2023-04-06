import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Typography, Box, Toolbar, Button, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { collection, query, db, onSnapshot } from "../utils/firebase.js";

const getCellColor = (params) => {
  console.log(params.row.validity);
  const age = params.row.validity;
  if (params.row.validity == 'false') {
    return '#f44336'; // red
  }
};

const columns = [
  { field: 'id', headerName: 'Car No', width: 120, renderCell: (params) => (
    <div style={{ backgroundColor: getCellColor(params) }}>
      {params.value}
    </div>
  ), },
  { field: 'created_date', headerName: 'Created Date', width: 110 },
  { field: 'puc_validity', headerName: 'PUC Validity', width: 160 },
  { field: 'tax_validity', headerName: 'Tax Validity', width: 160 },
  { field: 'insurance_validity', headerName: 'Insurance Validty', width: 160 },
  { field: 'validity', headerName: 'Validity', width: 10 }
  // { field: 'Completed', headerName: 'Completed', width: 100, renderCell: (params) => (
  //   <button onClick={() => handleMoveData(params.row.id)}>Completed</button>
  // )},
];

function AllCarData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "current_car_data"));
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setData(docs);
      });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                ANPR
            </Typography>
            <Button color="inherit"><Link to="/past-car-data" style={{ textDecoration: 'none', color: 'inherit' }}>Completed Data</Link></Button>
            <Button color="inherit"><Link to="/invalid-car-data" style={{ textDecoration: 'none', color: 'inherit' }}>Invalid Data</Link></Button>
            {/* <Button color="inherit"><Link to="/input-file" style={{ textDecoration: 'none', color: 'inherit' }}>Input File</Link></Button> */}
          </Toolbar>
        </AppBar>
        <Paper elevation={3} className="survey-card" sx={{margin:'7.5%',marginTop:'80px', padding:'2%' }}>
          <Box>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>All Car Data</Typography>
            <DataGrid
              autoHeight 
              rows={data}
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

export default AllCarData;
