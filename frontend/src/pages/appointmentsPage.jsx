import React from "react";
import StickyHeadTable from '../components/appointmentsTable';

const AppointmentsPage = () => {
  return (
    <div>
        <div style={{padding: "0px 0px 0px 25px"}}>
            <label style={{color: "#905EAF", fontSize: "72px"}}> Appointments</label>
            <p />
            <StickyHeadTable />
            {/* <label style={{color: "#905EAF", fontSize: "20px"}}>Date</label>
            <label style={{color: "#905EAF", fontSize: "20px", padding: "200px"}}>Status</label>
            <label style={{color: "#905EAF", fontSize: "20px", padding: "200px"}}>Billing Details</label>
            <label style={{color: "#905EAF", fontSize: "20px"}}>Amount</label> */}
        </div>
    </div>
  );
}

export default AppointmentsPage;