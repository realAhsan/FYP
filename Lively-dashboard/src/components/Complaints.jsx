import React from "react";
import ComplaintDataGrid from "./Complaint/ComplaintDataGrid";

const Complaints = () => {
  document.title = "Lively - Complaints";
  return (
    <div>
      {" "}
      <h1 className="text-5xl">Complaints</h1>
      <ComplaintDataGrid />
    </div>
  );
};

export default Complaints;
