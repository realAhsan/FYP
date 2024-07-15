import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const convertTimeArrayTo12HourStrings = (timesArray) => {
  const convertTo12HourFormat = (hour, minute) => {
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  return timesArray.map((time) => {
    const hour = time.hour !== undefined ? time.hour : 0;
    const minute = time.minute !== undefined ? time.minute : 0;
    return convertTo12HourFormat(hour, minute);
  });
};

const AddNewBus = () => {
  const navigate = useNavigate();
  const [departureTimes, setDepartureTimes] = useState([""]);
  const [arrivalTimes, setArrivalTimes] = useState([""]);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [routes, setRoutes] = useState([]);

  const [busNo, setBusNo] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchRoutes = async () => {
      try {
        const response = await fetch("http://localhost:8000/routes", {
          headers: {
            token: token,
          },
        });
        const data = await response.json();
        setRoutes(data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);
  const routeOptions = routes.map((route) => {
    return (
      <option value={route._id} key={route._id}>
        {route.name}
      </option>
    );
  });

  const handleAddDepartureTime = () => {
    setDepartureTimes([...departureTimes, { hour: 0, minute: 0 }]);
  };

  const handleAddArrivalTime = () => {
    setArrivalTimes([...arrivalTimes, { hour: 0, minute: 0 }]);
  };

  const handleDepartureChange = (index, value) => {
    const [hour, minute] = value.split(":").map(Number);
    const newDepartureTimes = [...departureTimes];
    newDepartureTimes[index] = { hour, minute };
    setDepartureTimes(newDepartureTimes);
  };

  const handleArrivalChange = (index, value) => {
    const [hour, minute] = value.split(":").map(Number);
    const newArrivalTimes = [...arrivalTimes];
    newArrivalTimes[index] = { hour, minute };
    setArrivalTimes(newArrivalTimes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedDepartureTimes =
      convertTimeArrayTo12HourStrings(departureTimes);
    const formattedArrivalTimes = convertTimeArrayTo12HourStrings(arrivalTimes);
    console.log("Formatted Departure Times:", formattedDepartureTimes);
    console.log("Formatted Arrival Times:", formattedArrivalTimes);

    const data = {
      busNo: busNo,
      busTimings: {
        departure: formattedDepartureTimes,
        arrival: formattedArrivalTimes,
      },
      route: selectedRoute,
    };

    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:8000/bus",
        {
          busNo: busNo,
          busTimings: {
            departure: formattedDepartureTimes,
            arrival: formattedArrivalTimes,
          },
          route: selectedRoute,
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("Bus Added Successfully");
          navigate("/busses");
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
      <h1 className="text-3xl font-bold text-black mb-6">Add New Bus</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="bus_no"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bus No:
          </label>
          <input
            type="number"
            id="bus_no"
            name="bus_no"
            className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => {
              setBusNo(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="route_no"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Route:
          </label>
          <select
            id="route_no"
            name="route_no"
            className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => {
              setSelectedRoute(e.target.value);
            }}
          >
            {routeOptions}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Departure Times:
          </label>
          {departureTimes.map((time, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="time"
                // value={
                //   !time
                //     ? `${
                //         time.hour !== ""
                //           ? time.hour.toString().padStart(2, "0")
                //           : ""
                //       }:${
                //         time.minute !== ""
                //           ? time.minute.toString().padStart(2, "0")
                //           : ""
                //       }`
                //     : time
                // }
                onChange={(e) => handleDepartureChange(index, e.target.value)}
                name="departure_times[]"
                className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddDepartureTime}
            className="mt-2 text-teal-500 font-medium hover:text-teal-700 focus:outline-none"
          >
            + Add Departure Time
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Arrival Times:
          </label>
          {arrivalTimes.map((time, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="time"
                // value={`${
                //   time.hour !== "" ? time.hour.toString().padStart(2, "0") : ""
                // }:${
                //   time.minute !== ""
                //     ? time.minute.toString().padStart(2, "0")
                //     : ""
                // }`}
                onChange={(e) => handleArrivalChange(index, e.target.value)}
                name="arrival_times[]"
                className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddArrivalTime}
            className="mt-2 text-teal-500 font-medium hover:text-teal-700 focus:outline-none"
          >
            + Add Arrival Time
          </button>
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

export default AddNewBus;
