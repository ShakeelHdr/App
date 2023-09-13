import React from 'react';
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Helmet } from 'react-helmet';

const Tableval = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //const columns = [    { field: "id", headerName: "ID", flex: 0.5 },    { field: "registrarId", headerName: "Registrar ID" },    {      field: "name",      headerName: "Name",      flex: 1,      cellClassName: "name-column--cell no-border-bottom",    },    {      field: "age",      headerName: "Age",      type: "number",      headerAlign: "left",      align: "left",    },    { field: "phone", headerName: "Phone Number", flex: 1 },    { field: "email", headerName: "Email", flex: 1 },    { field: "address", headerName: "Address", flex: 1 },    { field: "city", headerName: "City", flex: 1 },    { field: "zipCode", headerName: "Zip Code", flex: 1 },  ];

  //const columns = [{ field: "id", headerName: "ID", flex: 0.5 },   { field: "Postal", headerName: "Postal Code FSA", flex: 0.5 },   { field: "City", headerName: "City" },   { field: "Completed_Jobs", headerName: "Completed number of Jobs",      flex: 1,      cellClassName: "name-column--cell no-border-bottom",    },   { field: "Completed_Revenue",      headerName: "Completed Revenue",      type: "number",      headerAlign: "left",      align: "left",    },   { field: "Average_Rev_Job", headerName: "Average Revenue Per Job", flex: 1 }, ];
  
  //const columns = [{ field: "id", headerName: "ID", flex: 0.5 },   { field: "Postal", headerName: "Postal Code", flex: 0.5 },   { field: "City", headerName: "City" , flex: 0.5 },   { field: "Completed_Jobs", headerName: "Completed number of Jobs",      flex: 1 },   { field: "Completed_Revenue",      headerName: "Completed Revenue" , flex: 1},   { field: "Average_Rev_Job", headerName: "Average Revenue Per Job", flex: 1 }, ];
  const columns = [];
  Object.keys(props.data[0]).forEach(element => {
    columns.push({
      field: element, 
      headerName: element, 
      flex: 0.5
    })
  });
  console.log(props.data[0]);
  console.log(columns);

  const getRowId = (row) => {

    let id = '';
    columns.forEach(element=>{
      id += row[element.field];
      id += '-';
    }) 
    return id;
  }

  return (
    <Box m="20px">
      <Header
        title="ProfitFill"
        subtitle="Interview Exercise _ Raw Data"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            backgroundColor: "#48AAAD"/*colors.blueAccent[900]*/,
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .no-border-bottom": {
            borderBottom: "none !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#016064",/*colors.blueAccent[400],*/ 
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#016064"/*colors.blueAccent[100]*/,
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {/*colors.grey[100]*/
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={props.data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId =  {getRowId}
        />
      </Box>
    </Box>
  );
};

export default Tableval;
