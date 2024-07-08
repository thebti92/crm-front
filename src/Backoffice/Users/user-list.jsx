import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';


import axios from 'axios';
import { Button } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Swal from "sweetalert2";
import Label from "../components/label"
import Card from '@mui/material/Card';


import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import AddupdForm from './AddupdForm'
import toast from 'react-hot-toast';

const style = {
   
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

// -------------------------------------------------------------------------
// Function to fetch data from API
// async function fetchUserData8() {
//   try {
//     const response = await axios.get('http://localhost:4000/api/users/');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//     return []; // Return an empty array in case of error
//   }
// }








function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    {
      id: 'email',
      numeric: true,
      disablePadding: false,
      label: 'Email',
    },
    {
      id: 'phone',
      numeric: true,
      disablePadding: false,
      label: 'Phone',
    },
    {
      id: 'role',
      numeric: true,
      disablePadding: false,
      label: 'Role',
    }, 

    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Status',
      },

      // {
      //   id: 'Password',
      //   numeric: true,
      //   disablePadding: false,
      //   label: 'Password',
      // }, 

    {
      id: 'action',
      numeric: true,
      disablePadding: false,
      label: 'Action',
    }, 
  ];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>

        
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>


        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, searchQuery, setSearchQuery } = props;

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (



   
  // search user
      <OutlinedInput
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}

      placeholder="Search user..."
      startAdornment={
        <InputAdornment position="start">
             <SearchOutlined/>
        </InputAdornment>
      }
    />
  
// --------------------------------





      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// Main Table
export default function EnhancedTable() {

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [rows, setRows] = useState([]); // State to store fetched data
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  
 async function fetchUserData() {
  axios.get(`${BASE_URL}/api/users/`)
    .then(response => {
      setRows(response.data);
    })
    .catch(error => {
      // Handle errors here
      console.error('Error fetching data:', error);
    });
  }

  // 3 lignes for the modal 
  const [open, setOpen] = React.useState(false);
 // const handleOpen = () => setOpen(true);
 // const handleClose = () => setOpen(false);
// affter adding edit


const handleCloseModal = () => {
    setEditModalOpen(false); // Closes the modal
};
  // lignes for edit user
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEdit, setIsEdit] = useState(false); // Initialize isEdit state
  

    const handleOpen = () => {
        setSelectedUser({});
        setEditModalOpen(true); // Opens the modal
        setIsEdit(false);
    };
    const handleEdit = (user) => {
        setSelectedUser(user);
        setEditModalOpen(true);
        setIsEdit(true); // Assuming you have a state variable for isEdit
    };
  const [searchQuery, setSearchQuery] = React.useState(''); // AET

  useEffect(() => {
    // Fetch data when component mounts
    fetchUserData();
  },[]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;


 // AET
  const filteredRows = rows.filter(row =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // const visibleRows = React.useMemo(
  //   () =>
  //     stableSort(filteredRows, getComparator(order, orderBy)).slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage,
  //     ),
  //   [order, orderBy, page, rowsPerPage],
  // );


  
  // delete user -----------------
  const deleteApi = async (id) => {
    console.log("deleteApi ID ...", id);
    axios.delete(`${BASE_URL}/api/users/${id}`) 
      .then(() => {
        setRows(rows.filter((user) => user._id !== id)); // Corrected this line
       
     //   Swal.fire("Deleted!", "Your file has been deleted.", "success");
        toast.error('user deleted!');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  // delete alert
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#99CCFF",
      cancelButtonColor: "#FF876F",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

 // -------------------------------------------

  const visibleRows = stableSort(filteredRows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );


  // const deleteApi8 = async (id) => {
  //   const userDoc = doc(db, "products", id);
  //   await deleteDoc(userDoc);
  //   Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //   getUsers();
  // };



  


  return (
    <Box sx={{ width: '100%' }}>

      {/* <Box align="end" mb={1}>
         <Button
     //   onClick={() => setOpenAddContactModal(true)}
          variant="outlined"
        >
          <AddIcon /> Add Contact
        </Button>
      </Box>   */}

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button variant="outlined" onClick={handleOpen}>
          Add User
        </Button>
      </Stack>




      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
         numSelected={selected.length}
         searchQuery = {searchQuery}
         setSearchQuery = {setSearchQuery}
         
        />

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                  //  onClick={(event) => handleClick(event, row._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">{row.role}</TableCell>
                    {/* <TableCell align="right">{row.status}</TableCell> */}
                    <TableCell align="right">
                         <Label  color={(row.status === false && 'error') || 'success'}>{row.status == true ? 'active' : 'Banned'}</Label>
                    </TableCell>

                    {/* <TableCell align="right">{row.password}</TableCell> */}

                    <TableCell align="right" > 
                      <div style={{ gap: '20px'}}>  
                          {/* <Stack spacing={2} direction="row"> */}
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "#99CCFF",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              onClick={() => handleEdit(row)}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "FF876F",
                                cursor: "pointer",
                              }}
                             onClick={() => {
                                deleteUser(row._id);
                              }}
                            />
                          {/* </Stack> */}
                          </div>  
                        </TableCell>
                  </TableRow>
                );
              })}


        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                timeout: 500,
                },
            }}
        >
            <Fade in={editModalOpen}>
                <Card sx={style}>
                    <AddupdForm
                        // user={selectedUser}
                        // closeEvent={() => setEditModalOpen(false)}
                        // isEdit={true} // Pass true for editing mode
                        user={selectedUser}
                        closeEvent={() => setEditModalOpen(false)}
                        isEdit={isEdit} // Pass isEdit to AddupdForm
                        reload={fetchUserData}
                        
                    />
                </Card>
            </Fade>
        </Modal>


              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}


              
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}