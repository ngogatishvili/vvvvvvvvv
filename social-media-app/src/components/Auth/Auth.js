import React,{useState} from 'react';
import {Avatar,Button,Paper,Grid,Typography,Container, TextField} from "@material-ui/core";
import { LockOutlined} from "@material-ui/icons"
import useStyles from "./styles";
import Input from './Input';
import {GoogleLogin} from "@react-oauth/google";
import {useDispatch} from "react-redux";
import jwtDecode from "jwt-decode";
import {  useNavigate } from 'react-router-dom';
import {signin,signup} from "../../actions/auth";
import { AUTH } from '../../constants/actionTypes';


const initialState={
  firstName:"",
  lastName:"",
  email:"",
  password:"",
  repeatPassword:""
}

const Auth = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [showPassword,setShowPassword]=useState(false)
  const [formData,setFormData]=useState(initialState)
  const [isSignUp,setIsSignUp]=useState(false);
  const classes=useStyles();
  const handleSubmit=e=>{
    e.preventDefault();
      if(isSignUp) {
        dispatch(signup(formData,navigate))
        console.log(formData)
      }else{
        dispatch(signin(formData,navigate))
      }
  }
  const handleChange=e=>{
      setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleShowPassword=()=>{
    setShowPassword(prevState=>!prevState);
  }

  const switchMode=()=>{
      setIsSignUp(prevState=>!prevState);
      setShowPassword(false);
  }

  const googleSuccess=async(credentialResponse)=>{
        const token=credentialResponse.credential;
        const profileObj=jwtDecode(token);
        dispatch({type:AUTH,payload:{token,result:profileObj}})
        navigate("/")
      
  }

  const googleError=()=>{
    console.log("login failed,try again later")
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined/>
        </Avatar>
        <Typography variant="h5">{isSignUp? "Sign up":"Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
              {isSignUp && 
              <>
               <Input name="firstName" label="first name" handleChange={handleChange} half autoFocus />
               <Input name="lastName" label="last name" handleChange={handleChange} half />
             
              </>
              }
              <Input name="email" label="E-mail address" type="e-mail" handleChange={handleChange}/>
              <Input name="password" label="Password" type={showPassword?"text":"password"} handleChange={handleChange} handleShowPassword={handleShowPassword}/>
              {isSignUp &&  <Input name="repeatPassword" label="repeat Password" handleChange={handleChange} type="password"/>}
             
          </Grid>
          <Button className={classes.submit} variant="contained"  color="primary" type="submit" fullWidth>{isSignUp? "Sign Up":"Sign In"}</Button>
          <GoogleLogin onSuccess={googleSuccess} onError={googleError}/>
          
          <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button onClick={switchMode}>
                      {isSignUp? "Alredy registered? Sign in":"dont't have an account? sign up "}
                  </Button>
                </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth;
