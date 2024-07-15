import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: false,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: false,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 150,
    editable: false,
  },
  {
    field: "active",
    headerName: "Status",
    width: 110,
    editable: false,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14, active: "active" },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 31,
    active: "active",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 31,
    active: "active",
  },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11, active: "active" },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: 20,
    active: "active",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: "Rayenra",
    age: 150,
    active: "active",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    active: "active",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    active: "active",
  },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65, active: "active" },
];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
