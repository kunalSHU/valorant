import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Fragment } from 'react';
import "react-dropdown/style.css";
import useMutation from "apollo-client";
import {ProgressBar} from "react-bootstrap"
import {Card, CardContent, Typography, TextField, Grid, Button, MenuItem} from '@material-ui/core';
import { Formik} from 'formik';
import * as Yup from 'yup';
import {Form} from 'antd'
import axios from 'axios';


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
        axios.post('http://142.1.46.70:8086/account/create', {
            emailAddress: data.email,
            password: data.password
        })
        .then((response) => {
            console.log(response)
        }, (error) => {
            console.log(error);
        });
    }

    render(){
        return (
            <Fragment>
                <label style={{color: "#905EAF", fontSize: "72px"}}>Register</label>
                <Card variant="outlined" style={{display: 'inline-block', height: window.innerHeight/2, left: window.innerHeight/2.3
                ,position: "absolute", width: window.innerWidth/2, top: window.innerHeight/4}}>
                    <CardContent>
                    <br></br>
                    <Grid container spacing={1} alignItems="flex-start" direction="column" style={{position: "relative", left: window.innerWidth/6.3}}>

                        <Formik initialValues={{email:"", password:"", confirmPassword:""}} 
                    validationSchema={validationSchema} onSubmit={(data) => {this.submitValues(data)}} validator={() => ({})}>

                        {({handleSubmit, handleChange, handleBlur, values, errors, touched, dirty, isValid}) => (

                            <form onSubmit={handleSubmit}>
                                
                                <Grid item>
                                    <FormItem help={touched.email && errors.email ? this.emailError(errors.email) : ""}>
                                        <TextField type="text" onChange={handleChange} onBlur={handleBlur} value={values.email} name="email"variant="outlined" placeholder="Email"/>
                                    </FormItem>
                                </Grid>
                                <Grid item>
                                    <FormItem help={touched.password && errors.password ? this.passwordError(errors.password) : ""}>
                                        <TextField type="password" onChange={handleChange} onBlur={handleBlur} value={values.password} name="password" variant="outlined" placeholder="Password"/>
                                    </FormItem>
                                </Grid>
                                <Grid item>
                                    <FormItem help={touched.confirmPassword && errors.confirmPassword ? this.confirmPasswordError(errors.confirmPassword) : ""}>
                                        <TextField type="password" onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} name="confirmPassword" variant="outlined" placeholder="Confirm Password"/>
                                    </FormItem>
                                </Grid>
                                <Button variant="contained" color="primary" 
                                    style={{position: "absolute", left: "8%", top: "125%"}} 
                                    disabled={!dirty || errors.email || errors.password || errors.confirmPassword} 
                                    type="submit"
                                    onClick={handleSubmit}
                                    >
                                Submit
                                </Button>
                            </form>
 
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