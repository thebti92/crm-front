import React from "react";
import {Box} from "@mui/material";
import { Outlet } from "react-router-dom";
import Storenav from "./Storenav"
import "../../App.css"
import Footer from "./Footer"




const Layout = ({ cartItems, setCartItems , userToken, onSearch}) => {
return (
<>
  <div className="Bgcolor">
  {/* <Navbar /> */}
        <Box  />
           <Box sx={{marginRight: '3%',marginLeft : '3%', display: "inline"}}>   
            <Storenav cartItems={cartItems} setCartItems={setCartItems} userToken={userToken} onSearch={onSearch}/>
             
            <Box component="main"
             sx={{
              p: 0,
              flexGrow: 1,
              minHeight: 1,
              display: 'flex',
              flexDirection: 'column',
             }}
             
             
             >
              
            </Box>
            
            
            <Outlet />
            <Footer />
            
        </Box>
       
  </div>


</>

);
}

export default Layout;