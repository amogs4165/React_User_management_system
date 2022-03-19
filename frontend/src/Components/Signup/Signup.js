
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { Navigate } from 'react-router-dom';



function Signup() {

  const navigator = Navigate();
  const[error,setError] = useState('')

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
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
      });

      const onSubmit = async (data) => { 
        console.log(data);
        const removeProp = 'confirmPassword';
        const { [removeProp]: remove, ...modifiedData } = data;
        
        try{
          const url = '/api/users';
          const {data:res} = await axios.post(url,modifiedData);
          console.log(res.message)
          // navigator('/login')
        }catch(error){
          console.log(error.response.data);
          if(
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ){ setError(error.response.data.message);}
        }
      };
    
  return (
    <div style={{width:'100%',height:'100vh', display:'flex', justifyContent:"center", alignItems:'center', backgroundColor:'grey'}}>
    <Paper style={{maxWidth:'500px'}}>
      <Box px={3} py={2}  boxShadow={5}>
        <Typography variant="h6" align="center" margin="dense">
          SIGN UP
        </Typography>
        <Grid container spacing={1}>
          
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="userName"
              name="userName"
              label="Username"
              fullWidth
              margin="dense"
              {...register('userName')}
              error={errors.username ? true : false}
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
              label="Email"
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
              label="Password"
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
              label="Confirm Password"
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
        {error&&<div >
          {error}</div>}
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Paper>
  </div>
  )
}

export default Signup