import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Fragment } from 'react';
import DatePicker from "react-datepicker";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import randomString from "random-string";
import useMutation from "apollo-client";
import {ProgressBar} from "react-bootstrap"
import {Card, CardContent, Typography, makeStyles} from '@material-ui/core';

//Trying to retrieve and add data from patient record db and displaying it in UI
const client  = new ApolloClient({
    uri: 'http://142.1.46.70:8087/graphql'
  })

const options = [
    'Male', 'Female', 'Other', 'Kunal'
  ];
const defaultOption = options[0];

  
class RegisterPage extends React.Component{
    
    constructor(props){
        super(props)
        //this.useStyles.bind(this)
    }

    useStyles = () => {
        return makeStyles({
        root: {
          minWidth: 200,
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
      })
    };

    state = {
        firstName: '',
        lastName:'',
        email:'',
        gender:'',
        phoneNumber:'',
        dateRegistered: new Date(),
        birthdate: ''
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
        console.log(event)
        this.setState({ 
            gender: event.target.value
        })
    }

    phoneNumber = (event) => {
        this.setState({ 
            phoneNumber: event.target.value
        })
    }

    dateRegistered = (event) => {
        this.setState({ 
            dateRegistered: event.target.value
        })
    }

    birthdate = (event) => {
        console.log(event)
        this.setState({ 
            birthdate: event
        })
    }

    addUser= () => {
        console.log(this.state.firstName)
        console.log(this.state.lastName)
        console.log(this.state.phoneNumber)
        console.log(this.state.gender)
        console.log(this.state.dateRegistered)
        console.log(this.state.birthdate)
        console.log(this.state.email)
    }



    render(){
        return (
            <Fragment>
                
                <Card variant="outlined" style={{display: 'inline-block', height: "25%", left: "25%"
                ,position: "absolute", width: "50%", top: "25%"}}>
                <CardContent>
                    <Typography style={{position: "relative", left: "50%"}} gutterBottom>Register</Typography>
                    <ProgressBar animated now={45} />
                    </CardContent>
                </Card> 

                
                <div>First Name: 
                    <input id="firstName" type="text" onChange={this.firstName} ></input>
                </div> 

                <div>Last Name: 
                    <input id="lastName" type="text" onChange={this.lastName} ></input>
                </div> 

                <div>Email: 
                    <input id="email" type="text" onChange={this.email} ></input>
                </div> 

                <div>Gender: 
                    <select name="gender" id="gender" onChange={this.gender}>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                        <option value="kunal">Kunal</option>
                    </select>
                </div>

                <div>Phone Number: 
                    <input id="phoneNumber" type="text" onChange={this.phoneNumber} ></input>
                </div>

                <div>Date Registered:
                    <DatePicker selected={this.state.dateRegistered} onChange={this.dateRegistered}/>
                </div>

                <div>Birthdate:
                    <DatePicker selected={this.state.birthdate} onChange={(event) => this.birthdate(event)}/>
                </div>

                <div>Streetname: 
                    <input id="streetName" type="text" onChange={this.streetName} ></input>
                </div>

                <div>City: 
                    <input id="city" type="text" onChange={this.city} ></input>
                </div>

                <div>Postal Code: 
                    <input id="postalCode" type="text" onChange={this.postalCode} ></input>
                </div>

                <div>Province: 
                    <input id="province" type="text" onChange={this.province} ></input>
                </div>

                <div>Country: 
                    <input id="country" type="text" onChange={this.country} ></input>
                </div>

                <div>Other Details: 
                    <input id="otherDetails" type="text" onChange={this.otherDetails} ></input>
                </div>
                <input type="submit" value="Submit" onClick={this.addUser}></input> 
            </Fragment>
        )
    }
}
export default RegisterPage;