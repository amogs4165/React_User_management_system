import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { IconButton, Button } from '@mui/material';



const deleteUser = (one,two)=>{console.log(two.userName)}
const modifyUser = (one,two)=>{console.log(two._id); axios.put('/api/users')}
const columns = [
  { field: 'num', headerName: 'No', width: 70 },
  { field: 'userName', headerName: 'Name', width: 230 },
  { field: 'email', headerName: 'Email', width: 230 },
  {
    field: "Delete",
    renderCell: (cellValues) => {
      
      return (

        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            deleteUser(event, cellValues.row);
          }}
        >
          delete
        </Button>
      );
    }
  },
  {
    field: "Modify",
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            modifyUser(event, cellValues.row);
          }}
        >
          Modify
        </Button>
      );
    }
  },
  
];




function Admin() {

  var deleteIcon =
  (<button>delete</button>
  );

  const url = "/api/users"
  const [userDetails, setuserDetails] = useState([])
  useEffect(() => {
    axios.get(url).then((resp) => {
           setuserDetails(resp.data.userDetails)
      
    })

  }, [])

  const modifiedUserDetails = userDetails.map((user,index) => {user.num = index+1; return user})

                      
  const rows = modifiedUserDetails
  console.log(modifiedUserDetails);


  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      <div  style={{ paddingTop:'50px', height: 400, width: '50rem' }}>
        <DataGrid
          rows={rows}
          getRowId={(row) => row._id}
          
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          
        />
      </div>
    </div>
  );
}

export default Admin