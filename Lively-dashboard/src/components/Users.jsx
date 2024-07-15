import React from "react";
import UserDataGrid from "./Users/UserDataGrid";

const Users = () => {
  document.title = "Lively - Users";
  return (
    <div>
      {" "}
      <h1 className="text-5xl">User</h1>
      <UserDataGrid />
    </div>
  );
};

export default Users;
