import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "busId", headerName: "Bus Id", width: 90 },
  { field: "busNo", headerName: "Bus No", width: 90 },
  {
    field: "departureTimes",
    headerName: "Bus Timings | Departure",
    width: 250,
    editable: false,
  },
  {
    field: "arrivalTimes",
    headerName: "Bus Timings | Arrival",
    width: 250,
    editable: false,
  },
  {
    field: "routeName",
    headerName: "Route Name",
    width: 150,
    editable: false,
  },
];

async function fetchData() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:8000/bus", {
      headers: {
        token: token,
      },
    });
    const responseData = response.data;
    // console.log("Response Data:", responseData);
    return responseData; // You can return the data if needed
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error; // Rethrow the error if needed
  }
}
const data = await fetchData();
console.log(data);
function transformBusObject(bus) {
  return {
    busNo: bus.busNo,
    busId: bus.busId,
    departureTimes: bus.busTimings.departure,
    arrivalTimes: bus.busTimings.arrival,
    routeName: bus.route.name,
    routeNo: bus.route.no,
  };
}

const transformedData = data.map((bus) => transformBusObject(bus));
console.log("user", transformedData);
export default function BusDataGrid() {
  return (
    <Box
      sx={{
        height: 550,
        width: "100%",
        // "&. MuiDataGrid-columnHeaders": { backgroundColor: "#042f2e" },
      }}
    >
      <DataGrid
        rows={transformedData}
        getRowId={(row) => row.busId}
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
