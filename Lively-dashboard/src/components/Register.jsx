import React from "react";

import loginImg from "../assets/login.jpg";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  console.log(email, password);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`this is email and password ${email} ${password}`);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>

      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto bg-white p-4"
          method="POST"
          action="/login"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-center items-center">
            <div>
              <img src={logo} alt="lively_logo" />
            </div>

            <h2 className="text-4xl font-bold text-center py-6">Dashboard</h2>
          </div>

          <div className="flex flex-col py-2">
            <label>Email</label>
            <input
              className="border p-2"
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              className="border p-2"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Confirm Password</label>
            <input
              className="border p-2"
              type="password"
              name="passwordConfirm"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button
            className="border w-full my-5 py-2 bg-green hover:bg-green-800 text-white"
            type="submit "
          >
            Register
          </button>
          <div className="flex justify-between">
            <p className="flex items-center cursor-pointer">
              <Link to={"/forgotPassword"} className="mr-2" type="checkbox" />{" "}
              Forgot password
            </p>
            <Link to={"/admin"}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
