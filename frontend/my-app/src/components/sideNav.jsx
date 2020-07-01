import React, { Component } from "react";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
class SideNavigation extends Component {
    render() {
    return(
        <SideNav
            onSelect={(selected) => {
                // Add your code here
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="general">
                <NavItem eventKey="general">
                    <NavIcon>
                        <i className="fa fa-fw fa-general" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        General
                    </NavText>
                </NavItem>
                <NavItem eventKey="appointments">
                    <NavIcon>
                        <i className="fa fa-fw fa-line-appointments" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Appointments
                    </NavText>
                </NavItem>
                <NavItem eventKey="billing">
                    <NavIcon>
                        <i className="fa fa-fw fa-billing" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Billing
                    </NavText>
                </NavItem>
                <NavItem eventKey="medical-records">
                    <NavIcon>
                        <i className="fa fa-fw fa-medical-records" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Medical Records
                    </NavText>
                </NavItem>
                <NavItem eventKey="contact-us">
                    <NavIcon>
                        <i className="fa fa-fw fa-contact-us" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Contact Us
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>)
    }
}
export default SideNavigation;