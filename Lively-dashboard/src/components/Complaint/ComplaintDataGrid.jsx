import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";

const columns = [
  { field: "subject", headerName: "Subject", width: 200 },
  { field: "details", headerName: "Details", width: 800 },
  {
    field: "createdAt",
    headerName: "Date",
    width: 200,
    valueGetter: (params) => new Date(params.value).toLocaleString(),
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    renderCell: (params) => (
      <Select
        value={params.value}
        onChange={(e) => handleStatusChange(e, params)}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value={"Pending"}>Pending</MenuItem>
        <MenuItem value={"In Progress"}>In Progress</MenuItem>
        <MenuItem value={"Resolved"}>Resolved</MenuItem>
        <MenuItem value={"Closed"}>Closed</MenuItem>
      </Select>
    ),
  },
];

async function fetchData() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      "http://localhost:8000/complaint/complaints",
      {
        headers: {
          token: token,
        },
      }
    );
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
}

const transformComplaintObject = (complaint) => ({
  subject: complaint.subject,
  details: complaint.details,
  createdAt: complaint.createdAt,
  status: complaint.status,
  _id: complaint._id,
});

const handleStatusChange = async (event, params) => {
  const newStatus = event.target.value;
  console.log(newStatus);
  console.log(params.row._id);
  try {
    await axios.post(
      `http://localhost:8000/complaint/update-complaint/${params.row._id}`,
      { status: newStatus }
    );
    params.api.updateRows([{ ...params.row, status: newStatus }]);
  } catch (error) {
    console.log("Error updating status:", error);
  }
};

const ComplaintDataGrid = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      const data = await fetchData();
      setComplaints(data.map(transformComplaintObject));
    };

    fetchComplaints();
  }, []);

  return (
    <Box
      sx={{
        height: 550,
        width: "100%",
      }}
    >
      <DataGrid
        rows={complaints}
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

export default ComplaintDataGrid;
