import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import DatePicker from "react-datepicker";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import useMutation from "apollo-client";
import {ProgressBar} from "react-bootstrap"
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


//Trying to retrieve and add data from patient record db and displaying it in UI
const client  = new ApolloClient({
    uri: 'http://142.1.46.70:8081/graphql'
  })

const options = [
    'Male', 'Female'
  ];
const defaultOption = options[0];

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
  
class RegisterPage extends React.Component{

    state = {
        userid: 5,
        addressid: 2,
        userName:'',
        firstName: '',
        lastName:'',
        email:'',
        gender:'Male',
        phoneNumber: '',
        dateRegistered: '',
        password: '',
        reenterpassword: '',
        birthdate: '',
        streetName: '',
        city:'',
        postal_code: '',
        province: '',
        country:'',
        otherdetails: '',
        errors: {},
        isFormValid: false,
        formStep1: true,
        formStep2: false,
        progress: 0,
        showPassword: false,
        showReenterPassword: false
    }

    phoneNumber = (event) => {
        this.setState({ 
            phoneNumber: event.target.value
        })
    }

    firstName = (event) => {
        this.setState({ 
            firstName: event.target.value
        })
    }

    lastName = (event) => {
        this.setState({ 
            lastName: event.target.value
        })
    }

    email = (event) => {
        this.setState({ 
            email: event.target.value
        })
    }

    gender = (event) => {
        console.log("geneder stuff")
        console.log(this.state.gender)
        console.log(event)
        console.log(event.target.value)
        this.setState({ 
            gender: event.target.value
        })
    }

    userName = (event) => {
        this.setState({ 
            userName: event.target.value
        })

    }

    password = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    reenterpassword = (event) => {
        this.setState({
            reenterpassword: event.target.value
        })
    }

    dateRegistered = (event) => {
        this.setState({ 
            dateRegistered: event
        })
    }

    birthdate = (event) => {
        this.setState({ 
            birthdate: event
        })
    }

    streetName = (event) => {
        this.setState({ 
            streetName: event.target.value
        })
    }

    city = (event) => {
        this.setState({ 
            city: event.target.value
        })
    }

    postalCode = (event) => {
        this.setState({ 
            postalCode: event.target.value
        })
    }

    country = (event) => {
        this.setState({ 
            country: event.target.value
        })
    }

    province = (event) => {
        this.setState({ 
            province: event.target.value
        })
    }

    otherDetails = (event) => {
        this.setState({ 
            otherDetails: event.target.value
        })
    }

    handleClickShowPassword = () => {

        this.state.showPassword ? this.setState({
            showPassword: false
        }) :
        this.setState({
            showPassword: true
        })
    }

    handleClickShowReenterPassword = () => {

        this.state.showReenterPassword ? this.setState({
            showReenterPassword: false
        }) :
        this.setState({
            showReenterPassword: true
        })
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleMouseDownReenterPassword = (event) => {
        event.preventDefault();
    };

    stage1Form = () => {
        return(
            <div>
            <br></br>
            <Grid container spacing={1} alignItems="flex-end" style={{position: "relative", left: "5.5%", display: "flex"}}>
                <Grid item>
                    <TextField id="outlined-basic" label="FirstName" variant="outlined" 
                    onChange={this.firstName} helperText={this.state.errors["firstName"]}/>
                </Grid>
                <Grid item>
                    <TextField id="outlined-basic" label="LastName" variant="outlined" 
                    onChange={this.lastName} helperText={this.state.errors["lastName"]}/>
                </Grid>
                <Grid item>
                    <TextField id="outlined-basic" label="PhoneNumber" variant="outlined" 
                    onChange={this.phoneNumber} helperText={this.state.errors["phoneNumber"]}/>
                </Grid>
                <Grid item>
                    <TextField id="outlined-basic" label="Email" variant="outlined" 
                    onChange={this.email} helperText={this.state.errors["email"]}/>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-select-options"
                        select
                        label="Gender"
                        value={this.state.gender}
                        onChange={this.gender}
                        helperText="Please select your Gender"
                        variant="outlined"
                        >
                        {options.map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField id="outlined-basic" label="UserName" variant="outlined" 
                    onChange={this.userName} helperText={this.state.errors["userName"]}/>
                </Grid>
                <Grid item>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.password}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                labelWidth={70}
                            />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" >Reenter Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={this.state.showReenterPassword ? 'text' : 'password'}
                                value={this.state.reenterpassword}
                                onChange={this.reenterpassword}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowReenterPassword}
                                    onMouseDown={this.handleMouseDownReenterPassword}
                                    edge="end"
                                    >
                                    {this.state.showReenterPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                labelWidth={132}
                            />
                    </FormControl>
                </Grid>
                <Grid item>
                    <MaterialUIPickers></MaterialUIPickers>
                </Grid> 
            </Grid>
            <Button variant="contained" color="primary" 
            style={{position: "absolute", left: "45%", top: "87%"}} onClick={this.handleValidation}>
                Next
            </Button>
        </div>
        )
    }
    
    back = () => {
        this.setState({
            formStep1: true,
            formStep2: false
        })
    }

    stage2Form = () => {
        return(
            <div>
            <br></br>
            <Grid container spacing={1} alignItems="flex-end" style={{position: "relative", left: "5.5%"}}>
                <Grid item>
                    <TextField id="outlined-basic" label="StreetName" variant="outlined" 
                    onChange={this.streetName} helperText={this.state.errors["streetName"]}/>
                </Grid>
                <Grid item>
                    <TextField id="outlined-basic" label="City" variant="outlined" 
                    onChange={this.city} helperText={this.state.errors["city"]}/>
                </Grid>
                <Grid item>
                    <TextField id="outlined-basic" label="PostalCode" variant="outlined" 
                    onChange={this.postalCode} helperText={this.state.errors["postalCode"]}/>
                </Grid>
                <Grid item>
                    <TextField id="outlined-basic" label="Province" variant="outlined" 
                    onChange={this.province} helperText={this.state.errors["province"]}/>
                </Grid>
                <Grid item>
                    <TextField id="outlined-basic" label="Country" variant="outlined" 
                    onChange={this.country} helperText={this.state.errors["country"]}/>
                </Grid>
                <Grid item>
                    <TextField id="outlined-basic" label="OtherDetails" variant="outlined" 
                    onChange={this.otherDetails} helperText={this.state.errors["otherDetails"]}/>
                </Grid>
            </Grid>
            <Button color="primary" style={{position: "absolute", 
            left: "40%", top: "70%"}} variant= "outlined" onClick={this.back}>Back</Button>

            <ApolloProvider client={client} useMutation={ADDING_PATIENT}>
                <Mutation mutation={ADDING_PATIENT}>  
                    {(adding_patient, { data }) => (
                        <Button id="submit" value="Submit" variant="contained" color="primary" 
                        style={{position: "absolute", left: "50%", top: "70%"}} onClick={(e) => {
                            e.preventDefault();

                            //check to see if form is valid first
                            //otherwise we make post requests
                            if (!this.state.isFormValid) {
                                this.handleValidation();
                            }
                            else { 
                                adding_patient({
                                    variables: {
                                        userid: this.state.userid, addressid: this.state.addressid,
                                        username: this.state.userName, first_name: this.state.firstName,
                                        last_name: this.state.lastName, phone_number: this.state.phoneNumber,
                                        email: this.state.email, birthdate: this.state.birthdate,
                                        date_became_patient: this.state.dateRegistered,
                                        gender: this.state.gender
                                    }
                                })
                            }
                            console.log(this.state.phoneNumber)
                            console.log(typeof(this.state.phone))
                        }}>
                            Submit 
                        </Button>
                    )}
                </Mutation>
            </ApolloProvider>
        </div>
        )
    }

    handleValidation = () => {
        // var addressid = randomString({
        //     length: 3,
        //     numeric: true,
        //     letters: false,
        //     special: false});
        // var userid = randomString({
        //     length: 3,
        //     numeric: true,
        //     letters: false,
        //     special: false}); 
            
        console.log("IN HERE")
        //console.log(MaterialUIPickers.arguments)
        console.log(this.state.userName)
        console.log(this.state.firstName)
        console.log(this.state.lastName)
        console.log(this.state.phoneNumber)
        console.log(this.state.gender)
        console.log(this.state.dateRegistered)
        console.log(this.state.birthdate)
        console.log(this.state.email)

        let errors = {}

        if (this.state.formStep2) {
            if (this.state.streetName == '') {
                errors["streetName"] = "StreetName cannot be empty";
                this.setState({
                    errors: errors
                })
            }
            if (this.state.city == '') {
                errors["city"] = "City cannot be empty";
                this.setState({
                    errors: errors
            })
            }
            console.log(this.state.postalCode)
            if (this.state.postalCode == '') {
                errors["postalCode"] = "PostalCode cannot be empty";
                this.setState({
                    errors: errors
            })
            }
            if (this.state.province == '') {
                errors["province"] = "Province cannot be empty";
                this.setState({
                    errors: errors
            })
            }
            if (this.state.country == '') {
                errors["country"] = "Country cannot be empty";
                this.setState({
                    errors: errors
            })
            }
        }

        console.log("DODODODODODO")
        console.log(errors)
        console.log(Object.keys(errors).length === 0)
        //we good for next stage 
        if(Object.keys(errors).length === 0){
            this.setState({
                formStep1: false,
                formStep2: true,
                progress: 50
            })
            
        }

        console.log(this.state.city)
        console.log(this.state.postalCode)
        console.log(this.state.country)
        console.log(this.state.province)
        console.log(this.state.otherDetails)
             
    }

    render(){
        return (
            <Fragment>
                <label style={{color: "#905EAF", fontSize: "72px"}}>Register</label>
                <Card variant="outlined" style={{display: 'inline-block', height: "45%", left: "25%"
                ,position: "absolute", width: "50%", top: "25%"}}>
                    <CardContent>
                        <ProgressBar animated now={this.state.progress} label={`${this.state.progress}%`}/>   
                        {this.state.formStep1 ? this.stage1Form() : null}
                        {this.state.formStep2 ? this.stage2Form() : null}
                    </CardContent>
                </Card> 
            </Fragment>
        )
    }
}
export default RegisterPage;