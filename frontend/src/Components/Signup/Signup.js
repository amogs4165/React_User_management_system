
import React from 'react';
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



function Signup() {

    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required('Fullname is required'),
        username: Yup.string()
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
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
      });

      const {
        register,
        control,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
      });

      const onSubmit = data => {
        console.log(data);
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
              id="fullname"
              name="fullname"
              label="Full Name"
              fullWidth
              margin="dense"
              {...register('fullname')}
              error={errors.fullname ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.fullname?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="username"
              name="username"
              label="Username"
              fullWidth
              margin="dense"
              {...register('username')}
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
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Controller
                  control={control}
                  name="acceptTerms"
                  defaultValue="false"
                  inputRef={register()}
                  render={({ field: { onChange } }) => (
                    <Checkbox
                      color="primary"
                      onChange={e => onChange(e.target.checked)}
                    />
                  )}
                />
              }
              label={
                <Typography color={errors.acceptTerms ? 'error' : 'inherit'}>
                  I have read and agree to the Terms *
                </Typography>
              }
            />
            <br />
            <Typography variant="inherit" color="textSecondary">
              {errors.acceptTerms
                ? '(' + errors.acceptTerms.message + ')'
                : ''}
            </Typography>
          </Grid>
        </Grid>
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