import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddNewRoute = () => {
  const navigate = useNavigate();
  const [routeNo, setRouteNo] = useState("");
  const [routeName, setRouteName] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can use the state variables to submit the form data
    console.log("Form submitted:", {
      routeNo,
      routeName,
      startPoint,
      endPoint,
    });
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:8000/routes",
        {
          name: routeName,
          no: routeNo,
          startPoint: startPoint,
          endPoint: endPoint,
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("Route Added Successfully");
          navigate("/routes");
          console.log(res);
        }
      })
      .catch((err) => {
        if (err) {
          console.log("ERRer", err);
          console.log("break");
          console.log(err.response.status);
          if (err.response.status === 403) {
            toast.error("You are not authorized to perform this action");
            toast.error("PLease Login first to perform this action");
            setTimeout(() => {
              navigate("/admin");
            }, 2000);
          } else {
            toast.error("something went wrong please try again");
          }
        }
      });
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-black mb-6">Add New Route</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="route_no"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Route No:
          </label>
          <input
            type="number"
            id="route_no"
            name="route_no"
            className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => {
              setRouteNo(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="route_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Route Name:
          </label>
          <input
            type="text"
            id="route_name"
            name="route_name"
            className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => {
              setRouteName(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="start_point"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Point:
          </label>
          <input
            type="text"
            id="start_point"
            name="start_point"
            className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => {
              setStartPoint(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="end_point"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Point:
          </label>
          <input
            type="text"
            id="end_point"
            name="end_point"
            className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => {
              setEndPoint(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="border w-full my-5 py-2 bg-green-800 hover:bg-green text-white"
          >
            + Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewRoute;
