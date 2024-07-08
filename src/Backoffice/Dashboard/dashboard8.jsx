import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';

export default function Dashboard() {

return (
    <Box sx={{ width: '100%' }}>
     <Typography variant="h4">Dashboard</Typography>
       

     <Grid container spacing={2}>
        
        
        <Grid item xs={4}>
        <Card variant="outlined" sx={{ boxShadow: 3 ,bgcolor: '#FFCC99' }}>
           
            <h1>New Users</h1>
            <h1>New Users</h1>
            <h1>New Users</h1>
            <h1>New Users</h1>
            <h1>New Users</h1>
           
        </Card>         
        </Grid>

        <Grid item xs={4}>
        <Card variant="outlined" sx={{ boxShadow: 3 ,bgcolor: '#CCE5FF'}}>
            <h1>Total Orders</h1>
            <h1>Total Orders</h1>
            <h1>Total Orders</h1>
            <h1>Total Orders</h1>
            <h1>Total Orders</h1>
        </Card>         
        </Grid>

        <Grid item xs={4}>
        <Card variant="outlined" sx={{ boxShadow: 3 ,bgcolor: '#FFE5CC' }}>
            <h1>Available Products</h1>
            <h1>Available Products</h1>
            <h1>Available Products</h1>
            <h1>Available Products</h1>
            <h1>Available Products</h1>
        </Card>         
        </Grid>
    </Grid>

    </Box>
)

}