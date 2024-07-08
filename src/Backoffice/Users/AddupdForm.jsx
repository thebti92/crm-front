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
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role ? user.role : 'User',
                phone: user.phone,
                status: user.status != undefined ? user.status : false
            };

            console.log('userData----', userData);

            if (isEdit) {
                // Update existing user
                console.log('User data: ', user);
                console.log('User _id: ', user._id);

                const response = await axios.patch(`${BASE_URL}/api/users/${user._id}`, userData);
                if (response.status === 200) {
                    toast.success('User details updated successfully');
                    closeEvent();
                    reload();
                } else {
                    console.error('Failed to update user');
                    toast.error('Failed to update user');
                }
            } else {
                // Add new user
                const response = await axios.post(`${BASE_URL}/api/users/addUser`,  userData);
                if (response.status === 201) {
                    toast.success('User added successfully');
                    closeEvent();
                    reload();
                } else {
                    console.error('Failed to add user');
                    toast.error('Failed to add user');
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
            <h3>{isEdit ? 'Edit User' : 'New User'}</h3>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField name="name" label="Name" size="small" fullWidth value={user ? user.name : ''} onChange={handleChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField name="email" label="Email" size="small" fullWidth value={user ? user.email : ''} onChange={handleChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField name="phone" label="Phone" size="small" fullWidth value={user ? user.phone  : ''} onChange={handleChange} />
                </Grid>
                {/* <Grid item xs={6}>
                    <TextField name="password" label="Password" size="small" fullWidth value={user ? user.password  : ''} onChange={handleChange} />
                </Grid> */}
                <Grid item xs={6}>

                <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                             <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={user.role ? user.role : 'User'}
                                label="Role"
                                onChange={handleChange}
                                name="role"
                             >
                                      <MenuItem value="User">User</MenuItem>
                                      <MenuItem value="Manager">Manager</MenuItem>
                                      <MenuItem value="Admin">Admin</MenuItem>
                              </Select>
                </FormControl>


                </Grid>


                <Grid item xs={6}>
                    <div>Active ? <Switch checked={user.status} onChange={handleSwitchChange} /></div>
                    
                </Grid>


                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '8%', marginLeft: '30%' }}>
                    <Button variant="contained" color="primary" onClick={submitForm}>
                        {isEdit ? 'Update User' : 'Add User'}
                    </Button>
                    <Button variant="contained" color="error" onClick={closeEvent}>
                        Cancel
                    </Button>
                </div>
            </Grid>
        </Box>
    );
}
