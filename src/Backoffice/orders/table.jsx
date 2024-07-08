import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(prodname, prodimg, prodquantity, prodpriceQuantity,) {
  return { prodname, prodimg, prodquantity, prodpriceQuantity };
}

// const rows = [
//   createData('GOT t-shirt', '', 2, 500),
//   createData('Adidas shoes', '', 1, 300),

// ];

export default function BasicTable(rows) {

    console.log("ROWWWWS", rows.rows);
    const OrderRows = rows.rows ;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="left">Product Image</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Total</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {!OrderRows ?'No products found! ' : OrderRows.map((row) => ( 
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              
              <TableCell align="right">
              <img src={row.imageSrc} alt="Product" style={{ maxWidth: '20%', borderRadius: '5%' }} />
              </TableCell>

              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}