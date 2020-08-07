import React from "react";
import SideNavigation from '../components/sideNav';
import { Card,CardActions,CardContent,Typography,Button } from '@material-ui/core';

const ContactUsPage = () => {
  return (
    <div>
        <SideNavigation />
        <div style={{padding: "0px 0px 0px 25px"}}>
            <label style={{color: "#905EAF", fontSize: "72px"}}> Contact Us</label>
            <div>
                <Card style={{ width: "30%", float:"left" }} >
                    <CardContent>
                        <Typography variant="h5" component="h3">
                        Contact Information
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                        Phone number:  123-456-7890
                        <br/>
                        Location: 123 Abc Drive
                        <br/>
                        Hours of Operation: 9-5 Weekdays
                        <br/>
                        Email: john.doe@example.com
                        </Typography>
                    </CardContent>
                </Card>
                <Card style={{ width: "30%", marginLeft: "100px" }}>
                    <CardContent>
                        <Typography variant="h5" component="h3">
                        Ask us Anything
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                        Name: 
                        <input ></input>
                        <br/>
                        Email: 
                        <input ></input>
                        <br/>
                        Subject:
                        <input ></input>
                        <br/>
                        Message: 
                        <input ></input>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}

export default ContactUsPage;