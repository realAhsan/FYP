import React from "react";
import RoutesDataGrid from "./Routes/RoutesDataGrid";
import { Link } from "react-router-dom";

const BusRoutes = () => {
  document.title = "Lively - Routes";
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-5xl">Routes</h1>

        <Link to={"/newRoute"}>
          <button
            type="button"
            class="text-white bg-green-800 hover:bg-green focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add
          </button>
        </Link>
      </div>
      <RoutesDataGrid />
    </div>
  );
};

export default BusRoutes;