import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';




function Admin() {
  const navigate = useNavigate()
  const [userDetails, setuserDetails] = useState([])

  const deleteUser = async (one, two) => {
    axios.delete(`/api/users?userID=${two._id}`)
      .then((response) => {
        alert(two._id)
        setuserDetails(userDetails.filter(value => {
          if (two._id !== value._id) return true
        }))
      })
  }
  const modifyUser = (one, two) => { console.log(two._id); navigate(`/modify/${two._id}`) }
  // axios.put('/api/users')

  const url = "/api/users"

  useEffect(() => {
  
    axios.get(url).then((resp) => {
      setuserDetails(resp.data.userDetails)

    })

  }, [])

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

  const modifiedUserDetails = userDetails.map((user, index) => { user.num = index + 1; return user })


  const rows = modifiedUserDetails
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ paddingTop: '50px', height: 400, width: '50rem' }}>
        <DataGrid
          rows={rows}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          isRowSelectable={true}

        />
      </div>
    </div>
  );
}

export default Admin