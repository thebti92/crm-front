import React from "react";
import {Box} from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidenav from "../components/Sidenav"
import Navbar from "../components/Navbar"
import "../../App.css"



const Layout = (userToken) => {

  console.log("LAYOUUUUT", userToken);
return (
<>
  <div className="Bgcolor">
  {/* <Navbar /> */}
        <Box height={80}/>
           <Box sx={{marginRight: '3%',marginLeft : '3%', display: "flex", marginTop : "3%"}}>   
            <Sidenav />
            <Box component="main"
             sx={{
              p: 0,
              flexGrow: 1,
              minHeight: 1,
              display: 'flex',
              flexDirection: 'column',
             }}
             
             
             >
             
              <Navbar userToken={userToken} />
              
            </Box>
            
            <Outlet />
            
        </Box>
       
  </div>


</>

);
}

export default Layout;