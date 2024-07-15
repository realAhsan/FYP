// import React from "react";
// import { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const AddNewDriver = () => {
//   const navigate = useNavigate();
//   const [driverContact, setDriverContact] = useState("");
//   const [driverName, setDriverName] = useState("");
//   const [busNo, setBusNo] = useState("");

//   const handleSubmit = (e) => {
//     const token = localStorage.getItem("token");
//     e.preventDefault();
//     axios
//       .post(
//         "http://localhost:8000/driver",
//         {
//           name: driverName,
//           contactNo: driverContact,
//           busNo: busNo,
//         },
//         {
//           headers: {
//             token,
//           },
//         }
//       )
//       .then((res) => {
//         if (res.status === 201) {
//           toast.success("Driver Added Successfully");
//           console.log(res.message);
//           navigate("/drivers");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.success("Something went wrong make Sure Bus No is correct");
//       });
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold text-black mb-6">Add New Driver</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-6">
//           <label
//             htmlFor="driver_contact"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Driver Contact No:
//           </label>
//           <input
//             type="tel"
//             id="driver_contact"
//             name="driver_contact"
//             pattern="[0-9]{11}"
//             title="Please enter a valid 10-digit phone number."
//             className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
//             required
//             onChange={(e) => {
//               setDriverContact(e.target.value);
//             }}
//           />
//         </div>
//         <div className="mb-6">
//           <label
//             htmlFor="driver_name"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Driver Name:
//           </label>
//           <input
//             type="text"
//             id="driver_name"
//             name="driver_name"
//             className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
//             required
//             onChange={(e) => {
//               setDriverName(e.target.value);
//             }}
//           />
//         </div>
//         <div className="mb-6">
//           <label
//             htmlFor="bus_no"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Bus No:
//           </label>
//           <input
//             type="number"
//             id="bus_no"
//             name="bus_no"
//             className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
//             required
//             onChange={(e) => {
//               setBusNo(e.target.value);
//             }}
//           />
//         </div>

//         <div className="flex items-center justify-center">
//           <button
//             type="submit"
//             className="border w-full my-5 py-2 bg-green-800 hover:bg-green text-white"
//           >
//             + Add
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddNewDriver;

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddNewDriver = () => {
  const navigate = useNavigate();
  const [driverContact, setDriverContact] = useState("");
  const [driverName, setDriverName] = useState("");
  const [busNo, setBusNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/driver",
        {
          name: driverName,
          contactNo: driverContact,
          busNo: busNo,
          email: email,
          password: password,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("Driver Added Successfully");
          console.log(res.message);
          navigate("/drivers");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong. Make sure Bus No is correct");
      });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-black mb-6">Add New Driver</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="driver_contact"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Driver Contact No:
          </label>
          <input
            type="tel"
            id="driver_contact"
            name="driver_contact"
            pattern="[0-9]{11}"
            title="Please enter a valid 11-digit phone number."
            className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => {
              setDriverContact(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="driver_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Driver Name:
          </label>
          <input
            type="text"
            id="driver_name"
            name="driver_name"
            className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => {
              setDriverName(e.target.value);
            }}
          />
        </div>
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
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => {
              setPassword(e.target.value);
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

export default AddNewDriver;
