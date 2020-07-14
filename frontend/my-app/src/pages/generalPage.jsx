import React from "react";
import SideNavigation from '../components/sideNav';
import {
    Button,
    FormInput
  } from "shards-react";

  const GeneralPage = () => {
    return (
      <div>
          <SideNavigation />
          <div style={{padding: "0px 0px 0px 75px"}}>
              <label style={{color: "#905EAF", fontSize: "42px", padding: "0px 1000px 0px 0px"}} > General</label>
              <Button id="loginButton" theme="light" style={{textDecoration: 'none', color: 'white', borderColor: "#905EAF", backgroundColor: "#905EAF", padding: "5px"}} > Personal Details </Button>
              <Button id="loginButton" theme="light" style={{textDecoration: 'none', color: 'white', borderColor: "#905EAF", backgroundColor: "#905EAF", padding: "5px"}} > Family </Button>
              <p />
              {/* First Name */}
              <label style={{color: "#905EAF", fontSize: "20px"}}><strong>First Name:</strong></label>
              <label id="firstName" style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 10px"}}>John</label>

              {/* Last Name */}
              <label style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 50px"}}><strong>Last Name:</strong></label>
              <label id="lastName" style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 10px"}}>Doe</label>
              
              <p />
              {/* Address */}
              <label style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 0px"}}><strong>Address:</strong></label>
              <label id="address" style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 10px"}}>123 First Drive</label>

              {/* Sex */}
              <label style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 100px"}}><strong>Sex:</strong></label>
              <label id="sex" style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 10px"}}>M</label>
              
              <p />
              {/* Email */}
              <label style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 0px"}}><strong>Email:</strong></label>
              <label id="email" style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 10px"}}>Johndoe@gmail.com</label>

              <p />
              {/* Phone number */}
              <label style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 0px"}}><strong>Phone Number:</strong></label>
              <label id="phoneNumber" style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 10px"}}>123-456-7890</label>

              <p />
              {/* Birthdate */}
              <label style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 0px"}}><strong>Birthdate:</strong></label>
              <label id="birthDate" style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 10px"}}>April 12, 1981</label>

              <p />
              {/* Language */}
              <label style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 0px"}}><strong>Language:</strong></label>
              <label id="language" style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 10px"}}>English</label>

              <p style={{padding: "0px 0px 100px 0px"}}/>
              {/* Health card number */}
              <label style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 0px"}}><strong>Health Card Number:</strong></label>
              <label id="healthCardNumber" style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 10px"}}>0987654321</label>

              <p />
              {/* Default clinic */}
              <label style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 0px"}}><strong>Default Clinic:</strong></label>
              <label id="defaultClinic" style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 10px"}}>clinic in hell</label>

              <p />
              {/* Family Doctor */}
              <label style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 0px"}}><strong>Family Doctor:</strong></label>
              <label id="familyDoctor" style={{color: "#905EAF", fontSize: "20px", padding: "0px 0px 0px 10px"}}>Dr. wasteman</label>
          </div>
      </div>
    );
  }
  
  export default GeneralPage;