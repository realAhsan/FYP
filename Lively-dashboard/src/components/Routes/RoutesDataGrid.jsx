import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "Id", headerName: "ID", width: 90 },
  { field: "no", headerName: "Route No", width: 90 },

  {
    field: "name",
    headerName: "Route Name",
    width: 200,
    editable: false,
  },
  {
    field: "startPoint",
    headerName: "Start Point",
    width: 200,
    editable: false,
  },
  {
    field: "endPoint",
    headerName: "End Point",
    width: 200,
    editable: false,
  },
];

async function fetchData() {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("http://localhost:8000/routes", {
      headers: {
        token: token,
      },
    });
    const responseData = response.data;
    console.log("Response Data:", responseData);
    return responseData; // You can return the data if needed
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error; // Rethrow the error if needed
  }
}

const data = await fetchData();
console.log(data);
export default function DataGridDemo() {
  return (
    <Box sx={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={data}
        getRowId={(row) => row.Id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
