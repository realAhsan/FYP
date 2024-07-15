// import React from "react";

// const Notifications = () => {
//   return <div>notifications</div>;
// };

// export default Notifications;
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const handleSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    axios
      .post(
        `${API_URL}/notification`,
        {
          title: title,
          body: body,
          createdby: createdBy,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("Notification Added Successfully");
          console.log(res.message);
          navigate("/notifications");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-black mb-6">
        Add New Notification
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Body:
          </label>
          <textarea
            id="body"
            name="body"
            className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="created_by"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Created By:
          </label>
          <input
            type="text"
            id="created_by"
            name="created_by"
            className="block w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => {
              setCreatedBy(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="border w-full my-5 py-2 bg-green-800 hover:bg-green text-white"
          >
            + Add Notification
          </button>
        </div>
      </form>
    </div>
  );
};

export default Notifications;
