
import React, { useEffect, useState } from 'react';
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
import { useNavigate } from "react-router-dom";



function Signup({ userID }) {

  const [error, setError] = useState('')
  const [email, setvalueEmail] = useState('')

  const [name, setName] = useState('')
  const [userDetails, setUserDetails] = useState({})
  console.log(name)

  useEffect(() => {
    userID && getUserDetail()
  }, [])

  const url = `/api/users/${userID}`

  const getUserDetail = async () => {
    await axios.get(url).then((resp) => {
      setUserDetails(resp.data.userDetails);
      // setvalueEmail(resp.data.userDetails.email);
      // console.log(resp.data.userDetails)
      setValue("userName", resp.data.userDetails.userName)
      setValue("email", resp.data.userDetails.email)
    })
  }

  const navigate = useNavigate();


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
    console.log(data);
    const removeProp = 'confirmPassword';
    const { [removeProp]: remove, ...modifiedData } = data;

    try {

      const url = userID ? `/api/users/${userID}` : '/api/users';
      const { data: res } = await axios.post(url, modifiedData);
      console.log(res.message)
      userID ? navigate('/adminIndex') : navigate('/login')


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
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: "center", alignItems: 'center', backgroundColor: 'grey' }}>
      <Paper style={{ maxWidth: '500px' }}>
        <Box px={3} py={2} boxShadow={5}>
          <Typography variant="h6" align="center" margin="dense">
            {userID ? "MODIFY USER" : "SIGNUP"}
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
              {userID ? 'Update' : "Register"}
            </Button>
          </Box>
        </Box>
      </Paper>

    </div>
  )
}

export default Signup