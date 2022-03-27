import React, { useContext, useEffect, useState } from 'react'
import './Header.css'
import { ADMIN_TOKEN, TOKEN } from '../../utility';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../App';
import { useForm, Controller } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import * as Yup from 'yup';

import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button
} from '@material-ui/core';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '.5px solid #000',

  p: 4,
};

function Header({ admin }) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const value = useContext(myContext)
  const setAdmin = value.setAdmin
  const setUser = value.setUser
  const setDataUpdate = value.setDataUpdate

  const logout = () => { localStorage.removeItem(TOKEN); setUser(null) }
  const adminLogout = () => { localStorage.removeItem(ADMIN_TOKEN); setAdmin(null) }
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const validationSchema = Yup.object().shape({

    userName: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),

  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data) => {
   
    const removeProp = 'confirmPassword';
    const { [removeProp]: remove, ...modifiedData } = data;
    
    try {

      const url = '/api/users';
      await axios.post(url, modifiedData);
      setOpen(false);
      setDataUpdate(true);
      navigate('/adminIndex');

    } catch (error) {
      console.log(error.response.data);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) { setError(error.response.data.message); }
    }
  };

  return (

    <>
  
      <div className='header'>
        <div className='flex-container'>
          <div>

            <h1>Welcome</h1>
          </div>
          <div>
            {admin && <Button style={{ marginRight: '5px' }} onClick={handleOpen} variant="contained">Create User</Button>}
            <Button onClick={() => admin ? adminLogout() : logout()} variant="contained">Logout</Button>
          </div>

        </div>
      </div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Paper style={{ maxWidth: '500px' }}>
            <Box px={3} py={2} boxShadow={5}>
              <Typography variant="h6" align="center" margin="dense">
                CREATE USER
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="userName"
                    name="userName"
                    placeholder='User Name'

                    fullWidth
                    margin="dense"
                    {...register('userName')}
                    error={errors.userName ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.username?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    placeholder='email'
                    fullWidth
                    margin="dense"
                    {...register('email')}
                    error={errors.email ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.email?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="password"
                    name="password"
                    placeholder='Password'
                    type="password"
                    fullWidth
                    margin="dense"
                    {...register('password')}
                    error={errors.password ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.password?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="confirmPassword"
                    name="confirmPassword"

                    placeholder='Confirm Password'
                    type="password"
                    fullWidth
                    margin="dense"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.confirmPassword?.message}
                  </Typography>
                </Grid>
              </Grid>
              {error && <div >
                {error}</div>}
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(onSubmit)}
                >
                  Create User
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </>
  )
}

export default Header