import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import toast from 'react-hot-toast';

import Card from '@mui/material/Card';

import BasicTable from "./table"

export default function AddForm({ user: initialUser, closeEvent, isEdit , reload}) {

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    const [user, setUser] = useState(initialUser);

    
  // console.log('---reload---', reload);

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSwitchChange = (event) => {
        console.log('event.target.checked ........', event.target.checked);
        setUser({ ...user, status: event.target.checked });
    };

    const submitForm = async () => {
        try {
        //    const status = user.status ? 'active' : 'banned';

            const userData = {
                reford: user.reford,
                customer_id: user.customer_id,
                phone: user.phone,
                email: user.email,
                order_date: user.order_date,
                status: user.status,
                total_amount: user.total_amount,
                shipping_address: user.shipping_address,
                paymentMethod: user.paymentMethod,
              
            };

            console.log('orderData----', userData);

            if (isEdit) {
                // Update existing user
                console.log('order data: ', user);
                console.log('order _id: ', user._id);

                const response = await axios.patch(`${BASE_URL}/api/orders/${user._id}`, userData);
                if (response.status === 200) {
                    toast.success('order details updated successfully');
                    closeEvent();
                    reload();
                } else {
                    console.error('Failed to update order');
                    toast.error('Failed to update order');
                }
            } else {
                // Add new user
                const response = await axios.post(`${BASE_URL}/api/orders/addOrder`,  userData);
                if (response.status === 201) {
                    toast.success('order added successfully');
                    closeEvent();
                    reload();
                } else {
                    console.error('Failed to add order');
                    toast.error('Failed to add order');
                }
            }
        } catch (error) {
            console.log('error', error.response.data.message);
            toast.error(error.response.data.message);

            console.error('Error occurred while submitting form:', error);
         //   toast.error('Error occurred while submitting form');
        }
    };

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            <h3>{isEdit ? 'Edit order' : 'New order'}</h3>
           
            <Grid container spacing={2} sx={{p:3}} >

            <Card variant="outlined" sx={{ boxShadow: 2, width: '100%' }}> 
            <Grid container spacing={2} sx={{p:3}}>
            <Grid item xs={6}>
                    <TextField InputProps={{readOnly: true,}} name="reford" label="Reference" size="small" fullWidth value={user ? user.reford : ''} onChange={handleChange} />
            </Grid>
            
            <Grid item xs={6}>
                    <TextField InputProps={{readOnly: true,}} name="customer_id" label="Custommer Name" size="small" fullWidth value={user ? user.customer_id : ''} onChange={handleChange} />
            </Grid>

            <Grid item xs={6}>
                    <TextField InputProps={{readOnly: true,}} name="phone" label="Phone number" size="small" fullWidth value={user ? user.phone : ''} onChange={handleChange} />
            </Grid>

            <Grid item xs={6}>
                    <TextField InputProps={{readOnly: true,}} name="email" label="Email" size="small" fullWidth value={user ? user.email : ''} onChange={handleChange} />
            </Grid>
             
                <Grid item xs={6}>
                    <TextField InputProps={{readOnly: true,}} name="total_amount" label="total amount" size="small" fullWidth value={user ? user.total_amount  : ''} onChange={handleChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField InputProps={{readOnly: true,}} name="shipping_address" label="shipping address" size="small" fullWidth value={user ? user.shipping_address  : ''} onChange={handleChange} />
                </Grid>
                <Grid item xs={6}>

                <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">status</InputLabel>
                             <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={user.status ? user.status : 'pending'}
                                label="status"
                                onChange={handleChange}
                                name="status"
                             >
                                      <MenuItem value="pending">pending</MenuItem>
                                      <MenuItem value="shipped">shipped</MenuItem>
                                      <MenuItem value="delivered">delivered</MenuItem>
                                      <MenuItem value="cancelled">cancelled</MenuItem>
                                      {/* <MenuItem value="Admin">Admin</MenuItem> */}
                              </Select>
                              
                </FormControl>


                </Grid>
                <Grid item xs={6}>
                    <TextField InputProps={{readOnly: true,}} name="paymentMethod" label="paymentMethod" size="small" fullWidth value={user ? user.paymentMethod  : ''} onChange={handleChange} />
                </Grid> 

                {/* <Grid item xs={6}>
                <FormControl fullWidth size="small" >
                        <InputLabel id="demo-simple-select-label">payment Method</InputLabel>
                             <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={user.paymentMethod ? user.paymentMethod : ''}
                                label="payment Method"
                                onChange={handleChange}
                                name="paymentMethod"
                             >
                                      <MenuItem value="Paiement à la livraison">Paiement à la livraison</MenuItem>
                                      <MenuItem value="Carte Bancaire">Carte Bancaire</MenuItem>
                                 
                              </Select>
                              
                </FormControl>

                </Grid> */}

                </Grid>
              </Card> 
                <br />

    
            <Grid item xs={13} sx={{marginLeft: '-1%'}}>
            <Card variant="outlined" sx={{ boxShadow: 2, width: '100%' }}> 
                <BasicTable rows={user.products}/>
            </Card>
            </Grid>
    

            


                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '8%', marginLeft: '30%' }}>
                    <Button variant="contained" color="primary" onClick={submitForm}>
                        {isEdit ? 'Update order' : 'Add order'}
                    </Button>
                    <Button variant="contained" color="error" onClick={closeEvent}>
                        Cancel
                    </Button>
                </div>
            </Grid>
           
            
        </Box>
        
    );
}
