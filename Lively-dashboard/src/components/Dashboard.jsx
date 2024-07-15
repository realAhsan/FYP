import React from "react";
import { Link } from "react-router-dom";
import user from "../assets/user.png";
import bus from "../assets/bus.png";
import driver from "../assets/driver.svg";
import routes from "../assets/routes.png";
import complaint from "../assets/complaint.png";
import upload from "../assets/upload.png";

const Dashboard = () => {
  document.title = "Lively";
  return (
    <div>
      <h1 className="text-5xl">Dashboard</h1>

      {/* Cards Section */}

      <div className="gap-4 m-4 ">
        <div className="grid gap-4   lg:grid-cols-4 md:grid-cols-2 ">
          <Link to="/users">
            <div className="min-h-[200px] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex justify-between items-center p-4 cursor-pointer">
              <img src={user} alt="usericon" />
              <div className="flex flex-col  px-10">
                <h2 className="text-4xl">View</h2>
                <p className="text-lg bold">Users</p>
              </div>
            </div>
          </Link>

          <Link to="/busses">
            <div className="min-h-[200px] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex justify-between items-center p-4 cursor-pointer">
              <img src={bus} alt="busicon" />
              <div className="flex flex-col  px-10">
                <h2 className="text-4xl">Manage</h2>
                <p className="text-lg bold">Busses</p>
              </div>
            </div>
          </Link>

          <Link to="/drivers">
            <div className="min-h-[200px] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex justify-between items-center p-4 cursor-pointer">
              <img src={driver} alt="usericon" />
              <div className="flex flex-col  px-10">
                <h2 className="text-4xl">Manage</h2>
                <p className="text-lg bold">Drivers</p>
              </div>
            </div>
          </Link>

          <Link to="/routes">
            <div className="min-h-[200px] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex justify-between items-center p-4 cursor-pointer">
              <img src={routes} alt="usericon" />
              <div className="flex flex-col  px-10">
                <h2 className="text-4xl">Manage</h2>
                <p className="text-lg bold">routes</p>
              </div>
            </div>
          </Link>

          <Link to="/complaints">
            <div className="min-h-[200px] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex justify-between items-center p-4 cursor-pointer">
              <img src={complaint} alt="usericon" />
              <div className="flex flex-col px-10">
                <h2 className="text-4xl">Update</h2>
                <p className="text-lg bold">Complaints</p>
              </div>
            </div>
          </Link>
          {/* <div className="min-h-[200px] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"></div>
          <div className="min-h-[200px] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"></div>
          <div className="min-h-[200px] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"></div>
          <div className="min-h-[200px] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"></div> */}
        </div>
      </div>

      <div className=" border-t border-grey-300 m-4"></div>
      {/* timetable Section */}

      <div className="grid gap-4   lg:grid-cols-[2fr,1fr] md:grid-cols-1   ">
        <div className="min-h-[200px] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-center flex-col border border-grey-300">
          <img src={upload} alt="" />
          <Link to="/notifications"> Add Notification</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
