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
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';




import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import InputAdornment from '@mui/material/InputAdornment';


import defaultImage from "../assets/product-default-image.png";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const colors = [
    { title: 'Red'},
    { title: 'Blue'},
    { title: 'White'},
    { title: 'Cyan'},
    { title: 'Green'},
    { title: 'Yellow'},
    { title: 'Violet'},
    { title: 'Black'},
  ]

const sizes = [
    { title: 'XS' },
    { title: 'S' },
    { title: 'M' },
    { title: 'L' },
    { title: 'XL' },
    { title: 'XXL' },
    { title: 'XXXL' },
];


const category = [
    { label: 'Mode et accessoires' },
    { label: 'Vêtements' },
    { label: 'Électronique' },
    { label: 'Maison et jardin' },
    { label: 'Santé et beauté' },
    { label: 'Sports et loisirs' },
    { label: 'Alimentation et boissons' },
    { label: 'Automobiles et véhicules' },
    { label: 'Bébés et enfants' },
    { label: 'Outils et matériel' },
    { label: 'Loisirs créatifs et hobbies' },
    { label: 'Voyage et bagages' },
    { label: 'Équipement professionnel et industriel' },
    { label: 'Cadeaux et articles de luxe' },
    { label: 'Animaux de compagnie' },
    { label: 'Livres et médias' },
    { label: 'Services' }
];






const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export default function AddForm({ user: initialUser, closeEvent, isEdit , reload}) {

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    const [user, setUser] = useState(initialUser);

    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState({});
    

    
  // console.log('---reload---', reload);

useEffect(() => {
    setUser(initialUser);
    // Check if initialUser.colors exists and is an array before mapping
    setSelectedColors(initialUser.colors && Array.isArray(initialUser.colors) ? initialUser.colors.map(color => ({ title: color.title })) : []); 
    setSelectedSize(initialUser.size && Array.isArray(initialUser.size) ? initialUser.size.map(qsize => ({ title: qsize.title })) : []); 
  
    setSelectedCategory(initialUser.category ? {label: initialUser.category.label} : ''); 

   // setSelectedSize(initialUser.size ? {label: initialUser.size.label} : {label: ''}); 
  //  setSelectedSize(initialUser.size && Array.isArray(initialUser.size) ?? {label: initialUser.size.label} : undefined); 
     
}, [initialUser]);

    const handleChange8 = (event) => {
        // const { name, value } = event.target;
        // setUser({ ...user, [name]: value });

        const { name, value, files } = event.target;
        
        if (name === 'img' && files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
    
            reader.onload = () => {
                setUser({ ...user, [name]: reader.result });
            };
        } else {
            setUser({ ...user, [name]: value });
        }
    };


    const handleChange = (event) => {
        const { name, value, files } = event.target;
    
        if (name === 'img' && files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
    
            reader.onload = () => {
                setUser({ ...user, [name]: reader.result });
            };
        } else if (name === 'price' || name === 'tax' || name === 'promo') {
             
            const trimmedValue = value.trim();
            const floatValue = trimmedValue === '' ? 0 : parseFloat(trimmedValue);

            const price = name === 'price' ? parseFloat(floatValue) : user.price || 0;
            const tax = name === 'tax' ? parseFloat(floatValue) : user.tax || 0;
            const promo = name === 'promo' ? parseFloat(floatValue) : user.promo || 0;
            
       
            console.log("valueXXX : ", value)

            console.log("price :", price);
            console.log("tax :", tax);
            console.log("promo :", promo);

            const pricetax = (price - (price * promo / 100)) * (1 + tax / 100);
    
            setUser({ ...user, [name]: value, pricetax: pricetax.toFixed(2) });
        } else {
            setUser({ ...user, [name]: value });
        }
    };
    
    

    const handleSwitchChange = (event) => {
        console.log('event.target.checked ........', event.target.checked);
        setUser({ ...user, publish: event.target.checked });
    };

    const handleColorChange = (event, newValue) => {
        setSelectedColors(newValue);
    };

    const handleSizeChange = (event, newValue) => {
        setSelectedSize(newValue);
    };


    const handleCategoryChange = (event, newValue) => {
        setSelectedCategory(newValue); // Update state with the selected category
    };

    // const handleSizeChange = (event, newValue) => {
    //     setSelectedSize(newValue); // Update state with the selected category

    //     if (newValue == null) {
    //         setSelectedSize({label: ''});
    //     }
    // };

    const submitForm = async () => {
        try {
        //    const status = user.status ? 'active' : 'banned';

            const userData = {
                refprod: user.refprod,
                name: user.name,
                img: user.img,
                description: user.description,
                colors: selectedColors,
                size: selectedSize,
                price: user.price,
                tax: user.tax,
                promo: user.promo,
                pricetax : user.pricetax,
                stock: user.stock,
                weight: user.weight,
                category: selectedCategory,
                
                
                publish: user.publish != undefined ? user.publish : false
            };

            console.log('ProducttData----', userData);

            if (isEdit) {
                // Update existing user
                console.log('contact data: ', user);
                console.log('contact _id: ', user._id);

                const response = await axios.patch(`${BASE_URL}/api/products/${user._id}`, userData);
                if (response.status === 200) {
                    toast.success('User details updated successfully');
                    closeEvent();
                    reload();
                } else {
                    console.error('Failed to update contact');
                    toast.error('Failed to update contact');
                }
            } else {
                // Add new user
                const response = await axios.post(`${BASE_URL}/api/products/addProducts`,  userData);
                if (response.status === 201) {
                    toast.success('User added successfully');
                    closeEvent();
                    reload();
                } else {
                    console.error('Failed to add contact');
                    toast.error('Failed to add contact');
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
        
        
        <h2>{isEdit ? 'Edit Product' : 'Create a new product'}</h2>
            
        
        <Grid container spacing={2} columns={16}>
        

        <Grid item xs={8}>

<Card variant="outlined" sx={{ boxShadow: 2 }}>
    <Grid item xs={6} style={{marginLeft: '5%', marginTop: '3%'}}>
        {user.img ? (
            <img 
                src={user.img} 
                alt="Product" 
                style={{ 
                    maxWidth: '100%', 
                    maxHeight: '200px', 
                    borderRadius: '2%' 
                }} 
            />
        ) : (
            <img 
                src={defaultImage} // Replace "/default-image.jpg" with the path to your default image
                alt="Default Product" 
                style={{ 
                    maxWidth: '100%', 
                    maxHeight: '200px', 
                    borderRadius: '5%' 
                }} 
            />
        )}
        <br/>
        <Button 
            component="label" 
            role={undefined} 
            variant="contained" 
            tabIndex={-1} 
            startIcon={<CloudUploadIcon />}
        >
            Upload file 
            <VisuallyHiddenInput type="file" name="img" onChange={handleChange} />
        </Button>
       
    </Grid>
    <br />
</Card>







        </Grid>  


        <Grid item xs={8}>
        <Card variant="outlined" sx={{ boxShadow: 2 }}>

         <Grid container direction="column" justifyContent="center" alignItems="flex-start" spacing={2} style={{marginLeft: '1%'}}>  

           <Grid item xs={12}>
            <br />
                    <TextField name="refprod" label="Product Reference" size="small" fullWidth value={user ? user.refprod : ''} onChange={handleChange} />
           </Grid>
        
                    {/* <Grid container spacing={2}> */}
        
           
            <Grid item xs={6}>
                    <TextField name="name" label="Product name" size="small" fullWidth value={user ? user.name : ''} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sx={{ width: '80%' }}>
                    {/* <TextField name="description" label="Description" size="small" fullWidth value={user ? user.description  : ''} onChange={handleChange} /> */}
                    <TextField name="description" id="outlined-multiline-flexible" label="Description" multiline rows={4} maxRows={4} fullWidth value={user ? user.description  : ''} onChange={handleChange}/>
                    {/* <TextField id="outlined-multiline-static" label="Description"  multiline rows={4} defaultValue="Default Value" /> */}
            </Grid><br />


         </Grid>
            
        </Card>
        </Grid>




        </Grid>
        <br />
        
  
        <Grid container spacing={2} columns={16} >
        
        <Grid item xs={8}>

             
            <Card variant="outlined" sx={{ boxShadow: 2 }}>
            
        <Grid container direction="column" justifyContent="center" alignItems="flex-start" spacing={2} style={{marginLeft: '1%', marginTop: '1%'}}>  

            <Grid item xs={8}>
                    <TextField name="price" type="number" label="Price" size="small" fullWidth value={user ? user.price  : ''} onChange={handleChange} />
            </Grid>

            <Grid item xs={8}>
                    <TextField name="tax" type="number" label="Tax" size="small" fullWidth value={user ? user.tax  : ''} onChange={handleChange}
                    
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      }}
                    />
            </Grid>

            <Grid item xs={8}>
                    <TextField name="promo" type="number" label="Promo" size="small" fullWidth value={user ? user.promo  : ''} onChange={handleChange}
                    
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      }}
                    />
            </Grid>

            <Grid item xs={8}>
                    {/* <TextField id="outlined-number" type="number" name="pricetax" InputProps={{ readOnly: true,shrink: true }} label="Price TAX" size="small" fullWidth value={user ? user.pricetax  : ''} onChange={handleChange} /> */}
                    <TextField id="outlined-number" label="Price TAX" type="number" InputLabelProps={{ readOnly: true, shrink: true,}} size="small" value={user ? user.pricetax  : ''} onChange={handleChange}/>
            </Grid>
            <br />


        </Grid>    
            
            </Card>
           
         
        </Grid>

        <Grid item xs={8}>
        <Card variant="outlined" sx={{ boxShadow: 2 }}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start" spacing={2} style={{marginLeft: '1%', marginTop: '1%'}}>  
        
       
        <Grid item xs={6}>
                    <TextField name="stock" type="number" label="Stock" size="small" value={user ? user.stock  : ''} onChange={handleChange} />
        </Grid>

        <Grid item xs={6}>
        <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={category}
                value={selectedCategory}
                onChange={handleCategoryChange}

                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Category" size='small'/>}
        />
        </Grid>

        <Grid item xs={6}>
       
        {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={sizes}
                value={selectedSize}
                onChange={handleSizeChange}

                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Size" size='small'/>}
        /> */}

            
            <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      options={sizes}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.title}
                      value={selectedSize}
                      onChange={handleSizeChange}
                      renderOption={(props, option, { selected }) => (
                                 <li {...props}>
                                    <Checkbox
                                         icon={icon}
                                         checkedIcon={checkedIcon}
                                         style={{ marginRight: 8 }}
                                         checked={selected}
                                    />
                                    {option.title}
                                  </li>
                                   )}
                               style={{ width: 500 }}
                            renderInput={(params) => (
                                <Grid item xs={6}>
                           <TextField {...params} label="Sizes" placeholder="Favorites" size="small" />
                           </Grid>
                         )}
                        />
        </Grid>

       
       
       
        <Grid item xs={6}>
            <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      options={colors}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.title}
                      value={selectedColors}
                      onChange={handleColorChange}
                      renderOption={(props, option, { selected }) => (
                                 <li {...props}>
                                    <Checkbox
                                         icon={icon}
                                         checkedIcon={checkedIcon}
                                         style={{ marginRight: 8 }}
                                         checked={selected}
                                    />
                                    {option.title}
                                  </li>
                                   )}
                               style={{ width: 500 }}
                            renderInput={(params) => (
                                <Grid item xs={6}>
                           <TextField {...params} label="Colors" placeholder="Favorites" size="small" />
                           </Grid>
                         )}
                        />



                </Grid>


                <Grid item xs={6}>
        <TextField name="weight" type="number" label="Weight" size="small" fullWidth value={user ? user.weight  : 'AAAAA'} onChange={handleChange}
                    
                    InputProps={{
                        endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                      }}
                    />
        </Grid>
   
               

               

                <Grid item xs={6}>
                    <div>Publish ? <Switch checked={user.publish} onChange={handleSwitchChange} /></div>
                    
                </Grid>

                </Grid>
              </Card>
            </Grid>   
    
   </Grid>

   
            


                <div style={{ display: 'flex', justifyContent: 'normal', gap: '20px', marginTop: '5%', marginLeft: '40%' }}>
                    <Button variant="contained" color="primary" onClick={submitForm}>
                        {isEdit ? 'Update product' : 'Add product'}
                    </Button>
                    <Button variant="contained" color="error" onClick={closeEvent}>
                        Cancel
                    </Button>
                </div>
            
        </Box>
    );
}
