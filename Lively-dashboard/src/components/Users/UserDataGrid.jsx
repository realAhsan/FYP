import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
];

async function fetchData() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:8000/get", {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
}

function transformUserObject(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
}

const UserDataGrid = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadUserData() {
      const fetchedData = await fetchData();
      const transformedData = fetchedData.map((user) => transformUserObject(user));
      setData(transformedData);
    }
    loadUserData();
  }, []);

  return (
    <Box
      sx={{
        height: 550,
        width: "100%",
      }}
    >
      <DataGrid
        rows={data}
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

export default UserDataGrid;
