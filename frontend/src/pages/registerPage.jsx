import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Fragment } from 'react';
import "react-dropdown/style.css";
import useMutation from "apollo-client";
import {ProgressBar} from "react-bootstrap"
import {Card, CardContent, Typography, TextField, Grid, Button, MenuItem, Divider, TableFooter} from '@material-ui/core';
import { Formik} from 'formik';
import * as Yup from 'yup';
import {Form} from 'antd'
import axios from 'axios';
import history from '../history'
import ReactSnackBar from "react-js-snackbar";


//Trying to retrieve and add data from patient record db and displaying it in UI
const client  = new ApolloClient({
    uri: 'http://142.1.46.70:8081/graphql'
  })

const options = [
    'Male', 'Female'
  ];
const defaultOption = options[0];
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ADDING_PATIENT = gql`
mutation addUserInfo($userid: Int, $addressid: Int,$username: String, $first_name: String, $last_name: String,
    $phone_number: String, $email: String, $birthdate: String, $date_became_patient: String,
    $gender: String) {
        addUserInfo(userid: $userid, addressid: $addressid, username: $username, first_name: $first_name, last_name: $last_name,
            phone_number: $phone_number, email: $email, birthdate: $birthdate, 
            date_became_patient: $date_became_patient, gender: $gender) {
                addressid
                userid
        }

}`;

const FormItem = Form.Item;
const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const specialCharacterRegex = /(?=.[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?])/;

const validationSchema  = Yup.object({
    email: Yup
    .string()
    .label("Email")
    .email()
    .required("Required"),
    password: Yup
    .string()
    .label("Password")
    .required("Required")
    .min(6, "Password must be atleast 6 characters")
    .max(128, "Maximum password length is 128 characters, please shorten it")
    .matches(lowercaseRegex, 'Atleast one lowercase letter required')
    .matches(uppercaseRegex, 'Atleast one uppercase letter required')
    .matches(numericRegex, 'Atleast one number required')
    .matches(specialCharacterRegex, 'Atleast one special character required'),
    confirmPassword: Yup
    .string()
    .required()
    .label("Confirm Password")
    .test("password-match", "Passwords do not match", function(value) {
        return this.parent.password === value;
    })
})

class RegisterPage extends React.Component{

    state = {
        Show: false,
        Showing: false
    }

    emailError = (errEmail) => {
        return(
            <p style={{color:"red"}}>{errEmail}</p>
        )
    }

    confirmPasswordError = (errconfirmPassword) => {
        return(
            <p style={{color:"red"}}>{errconfirmPassword}</p>
        )
    }

    passwordError = (errPassword) => {
        return(
            <p style={{color:"red"}}>{errPassword}</p>
        )
    }

    submitValues = (data) => {

        axios.get(`http://142.1.46.70:8086/account/find?email=${data.email}`)
        .then((response) => {
            if(Object.keys(response.data.data.foundAccount).length===0){
                axios.post('http://142.1.46.70:8086/account/create', {
                    emailAddress: data.email,
                    password: data.password
                })
                .then((response) => {
                    console.log(response)
                    history.push('/login')
                    this.setState({ Show: true, Showing: true });
                    setTimeout(() => {
                        this.setState({ Show: false, Showing: false });
                    }, 2500);  
                    setTimeout(() => {
                        window.location.reload(false)
                    }, 1000);  
                }, (error) => {
                    console.log(error);
                });
            }
            else {
                alert('Account with that email address already exists!');
            }
        })  
        return;
    }

    submitValues = (data) => {

        axios.get(`http://142.1.46.70:8086/account/find?email=${data.email}`)
        .then((response) => {
            if(Object.keys(response.data.data.foundAccount).length===0){
                axios.post('http://142.1.46.70:8086/account/create', {
                    emailAddress: data.email,
                    password: data.password
                })
                .then((response) => {
                    console.log(response)
                    history.push('/login')
                    this.setState({ Show: true, Showing: true });
                    setTimeout(() => {
                        this.setState({ Show: false, Showing: false });
                    }, 2500);  
                    setTimeout(() => {
                        window.location.reload(false)
                    }, 1000);  
                }, (error) => {
                    console.log(error);
                });
            }
            else {
                alert('Account with that email address already exists!');
            }
        })  
        return;
    }

    submitValues = (data) => {
        axios.post('http://142.1.46.70:8086/account/create', {
            emailAddress: data.email,
            password: data.password
        })
        .then((response) => {
            if(Object.keys(response.data.data.foundAccount).length===0){
                axios.post('http://142.1.46.70:8086/account/create', {
                    emailAddress: data.email,
                    password: data.password
                })
                .then((response) => {
                    console.log(response)
                    history.push('/login')
                    this.setState({ Show: true, Showing: true });
                    setTimeout(() => {
                        this.setState({ Show: false, Showing: false });
                    }, 2500);  
                    setTimeout(() => {
                        window.location.reload(false)
                    }, 1000);  
                }, (error) => {
                    console.log(error);
                });
            }
            else {
                alert('Account with that email address already exists!');
            }
        })  
        return;
    }

    render(){
        return (
            <Fragment>
                <ReactSnackBar Icon={<span></span>} Show={this.state.Show}>
                    Registered Successfully!
                </ReactSnackBar>
                <Card variant="outlined" style={{display: 'inline-block', height: window.innerHeight/1.1, left: window.innerHeight/2.3
                ,position: "absolute", width: window.innerWidth/2}}>
                    <CardContent>
                    <label style={{position:"relative", left: "37%", color: "#905EAF", fontSize: "35px"}}>Register</label>
                    <Divider/>
                    <br></br>
                    <Grid container spacing={1} alignItems="flex-start" direction="column" style={{position: "relative", left: window.innerWidth/6.3}}>

                        <Formik initialValues={{email:"", password:"", confirmPassword:""}} 
                    validationSchema={validationSchema} onSubmit={(data) => {this.submitValues(data)}} validator={() => ({})}>

                        {({handleSubmit, handleChange, handleBlur, values, errors, touched, dirty, isValid}) => (
                            <Fragment>
                            <form onSubmit={handleSubmit}>
                                
                                <Grid item>
                                    <TextField type="text" helperText={touched.email && errors.email ? this.emailError(errors.email) : ""}
                                        onChange={handleChange} onBlur={handleBlur} value={values.email} 
<<<<<<< HEAD
                                        name="email"variant="outlined" placeholder="Email" label="Email"
=======
                                        name="email"variant="outlined" placeholder="Email" label="First name"
>>>>>>> 8fb2f86... Rebasing from master
                                        margin="dense"/>
                                </Grid>
                                <Grid item>
                                    <TextField type="password" helperText={touched.password && errors.password ? this.passwordError(errors.password) : ""}
                                        onChange={handleChange} onBlur={handleBlur} value={values.password} 
                                        name="password" variant="outlined" placeholder="Password" label="Password"
                                        margin="dense"/>
                                </Grid>
                                <Grid item>
                                    <TextField type="password" onChange={handleChange} helperText={touched.confirmPassword && errors.confirmPassword ? this.confirmPasswordError(errors.confirmPassword) : ""}
                                        onBlur={handleBlur} value={values.confirmPassword} 
                                        name="confirmPassword" variant="outlined" placeholder="Confirm Password" label="Confirm Password"
                                        margin="dense"/>
                                </Grid>
                                
                            </form>
                            <br></br>
                            <Button variant="contained" color="primary" 
                                style={{position: "absolute", left: "8%", top: "125%"}} 
                                disabled={!dirty || errors.email || errors.password || errors.confirmPassword} 
                                onClick={handleSubmit}>
                                Submit
                            </Button>
                            </Fragment>
 
                        )}
                        </Formik>
     
                    </Grid>
                    </CardContent>
                </Card> 
    
            </Fragment>
        )
    }
}
export default RegisterPage;