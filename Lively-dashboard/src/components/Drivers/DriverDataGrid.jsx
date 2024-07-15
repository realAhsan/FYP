import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "driverId", headerName: "Driver Id", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  {
    field: "contactNo",
    headerName: "Phone",
    width: 200,
    editable: false,
  },
  {
    field: "bus",
    headerName: "Bus Number",
    width: 150,
    editable: false,
  },
  {
    field: "route",
    headerName: "Route No",
    width: 150,
    editable: false,
  },
];

async function fetchData() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:8000/driver", {
      headers: {
        token: token,
      },
    });
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
}

const data = await fetchData();
console.log(`drivers data`, data);
function transformBusObject(driver) {
  return {
    name: driver.name,
    contactNo: driver.contactNo,
    bus: driver.bus.busNo,
    route: driver.route.no,
    _id: driver._id,
    driverId: driver.driverId,
  };
}
const transformedData = data.map((driver) => transformBusObject(driver));
console.log("driver", transformedData);
const DriverDataGrid = () => {
  return (
    <Box
      sx={{
        height: 550,
        width: "100%",
      }}
    >
      <DataGrid
        rows={transformedData}
        getRowId={(row) => row._id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DriverDataGrid;
