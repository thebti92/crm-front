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
                ref: user.ref,
                name: user.name,
                email: user.email,
                status: user.status ? user.status : 'New',
                phone: user.phone,
                subject: user.subject,
                description: user.description,
            };

            console.log('contactData----', userData);

            if (isEdit) {
                // Update existing user
                console.log('contact data: ', user);
                console.log('contact _id: ', user._id);

                const response = await axios.patch(`${BASE_URL}/api/contacts/${user._id}`, userData);
                if (response.status === 200) {
                    toast.success('Ticket updated successfully');
                    closeEvent();
                    reload();
                } else {
                    console.error('Failed to update Ticket');
                    toast.error('Failed to update Ticket');
                }
            } else {
                // Add new user
                const response = await axios.post(`${BASE_URL}/api/contacts/addContact`,  userData);
                if (response.status === 201) {
                    toast.success('Ticket added successfully');
                    closeEvent();
                    reload();
                } else {
                    console.error('Failed to add Ticket');
                    toast.error('Failed to add Ticket');
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
            <h3>{isEdit ? 'Edit Ticket' : 'New Ticket'}</h3>
            <br />
            <Grid container spacing={2}>
            <Grid item xs={6}>
                    <TextField name="ref" label="Reference" size="small" fullWidth value={user ? user.ref : ''} onChange={handleChange} InputProps={{ readOnly: isEdit }} />
                </Grid>
                <Grid item xs={6}>
                    <TextField name="name" label="Name" size="small" fullWidth value={user ? user.name : ''} onChange={handleChange} InputProps={{ readOnly: isEdit }} />
                </Grid>
                <Grid item xs={6}>
                    <TextField name="email" label="Email" size="small" fullWidth value={user ? user.email : ''} onChange={handleChange}  InputProps={{ readOnly: isEdit }} />
                </Grid>
                <Grid item xs={6}>
                    <TextField name="phone" label="Phone" size="small" fullWidth value={user ? user.phone  : ''} onChange={handleChange}  InputProps={{ readOnly: isEdit }} />
                </Grid>
                <Grid item xs={6}>
                    <TextField name="subject" label="Subject" size="small" fullWidth value={user ? user.subject  : ''} onChange={handleChange}  InputProps={{ readOnly: isEdit }} />
                </Grid>

                <Grid item xs={6}>

<FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
             <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user.status ? user.status : 'New'}
                label="Status"
                onChange={handleChange}
                name="status"
             >
                      <MenuItem value="New">New</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Closed">Closed</MenuItem>
                      {/* <MenuItem value="Admin">Admin</MenuItem> */}
              </Select>
</FormControl>


</Grid>

             

                <Grid item xs={12} sx={{ width: '80%' }}>
                    <TextField name="description" id="outlined-multiline-flexible" label="Description" multiline rows={4} maxRows={4} fullWidth value={user ? user.description  : ''} onChange={handleChange} InputProps={{ readOnly: isEdit }}/>
                </Grid><br />
 


            


                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '8%', marginLeft: '30%' }}>
                    <Button variant="contained" color="primary" onClick={submitForm}>
                        {isEdit ? 'Update Ticket' : 'Add Ticket'}
                    </Button>
                    <Button variant="contained" color="error" onClick={closeEvent}>
                        Cancel
                    </Button>
                </div>
            </Grid>
        </Box>
    );
}
