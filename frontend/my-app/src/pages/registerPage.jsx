import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Fragment } from 'react';
import DatePicker from "react-datepicker";

//Trying to retrieve and add data from patient record db and displaying it in UI
const client  = new ApolloClient({
    uri: 'http://142.1.46.70:8087/graphql'
  })


class RegisterPage extends React.Component{

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

                <input type="submit" value="Submit" onClick={this.addUser}></input> 
            </Fragment>
        )
    }
}
export default RegisterPage;