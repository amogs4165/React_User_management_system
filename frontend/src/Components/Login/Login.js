import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TOKEN } from "../../utility";

function Login({ setUser }) {

  const navigator = useNavigate();

  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  const focus = () => setFocus('email')

  useEffect(() => {
    focus()
  }, []);

  const onSubmit = async (data) => {
   
    try {
      const url = "/api/auth?jey[key]=value&jey[key2]=value2";
      const { data: res } = await axios.post(url, data);
      console.log(res.data);
      localStorage.setItem(TOKEN, res.data);
      setUser(res.data)
      navigator("/");
    } catch (error) {
      console.log(error.response.data);

      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
      }}
    >
      <Paper style={{ maxWidth: "400px" }}>
        <Box px={3} py={2} boxShadow={5}>
          <Typography variant="h6" align="center" margin="dense">
            SIGN IN
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"

                fullWidth
                margin="dense"
                {...register("email")}

                error={errors.email ? true : false}

              />
              <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                margin="dense"
                {...register("password")}
                error={errors.password ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
            </Grid>
          </Grid>
          {error && <div>{error}</div>}
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}

export default Login;
