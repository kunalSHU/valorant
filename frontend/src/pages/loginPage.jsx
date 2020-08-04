import React from "react";
import clsx from 'clsx';
import { Fragment } from 'react';
import {Card, CardContent, Typography, TextField, Grid, Button, MenuItem} from '@material-ui/core';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import MaterialUIPickers from './datePicker';
import Visibility from '@material-ui/icons/Visibility';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import {
    FormInput
  } from "shards-react";
import axios from 'axios';
import history from '../history'

const errors = {}

class LoginPage extends React.Component{

  state = {
      email:'',
      password:'',
      isFormValid: false,
      showPassword: false,
  }

  email = (event) => {
    let email = event.target.value
    this.setState({ 
      email: event.target.value
    })

    if(email == ''){
        errors["email"] = "Email cannot be empty";
        this.setState({
            errors: errors
        })
    }
    else{
        errors["email"] = "";
        this.setState({
            errors: errors 
        })
    }
    console.log(this.state.errors)
  }

  password = (event) => {
    let password = event.target.value
    console.log(password)
    this.setState({ 
        password: event.target.value
    })

    if(password == ''){
        errors["password"] = "Password cannot be empty";
        this.setState({
            errors: errors
        })
    }
    else{
        errors["password"] = "";
        this.setState({
            errors: errors 
        })
    }
  }

  loginUser = () => {
    console.log (this.state.email)
    console.log (this.state.password)
    axios.get(`http://142.1.46.70:8086/account/find?email=${this.state.email}`)
    .then((response) => {
        //account exists
        console.log(response)
        console.log(Object.keys(response.data.data.foundAccount).length)
        if(Object.keys(response.data.data.foundAccount).length!==0){
            console.log(response)
            history.push('/general')
            window.location.reload(false)
        }
        else{
            alert('Account does not exist. Please register.');
        }
    })
  }

  LoginForm = () => {
    return(
        <div>
        <br></br>
        <Grid container spacing={1} alignItems="flex-end" direction="column" style={{position: "relative", right: "25%", display: "flex"}}>
            <Grid item>
                <TextField id="outlined-basic" label="Email" variant="outlined" 
                onChange={this.email} helperText={errors["email"]} defaultValue={this.state.email}/>
            </Grid>

            <Grid item>
                <TextField type="password" onChange={this.password} name="password" variant="outlined" placeholder="Password"/>
            </Grid>
        </Grid>
        <Button id="loginButton" value="Login" variant="contained" color="primary" 
                  style={{position: "absolute", left: "50%", top: "70%"}} onClick={this.loginUser}>
                    Login 
            </Button>
    </div>
    )
}
render(){
  return (
      <Fragment>
          <label style={{color: "#905EAF", fontSize: "72px"}}>Login</label>
          <Card variant="outlined" style={{display: 'inline-block', height: window.innerHeight/2, left: window.innerHeight/2.3
          ,position: "absolute", width: window.innerWidth/2, top: window.innerHeight/4}}>
              <CardContent>
                  {this.LoginForm()}
              </CardContent>
          </Card> 
      </Fragment>
  )
}


}
export default LoginPage;