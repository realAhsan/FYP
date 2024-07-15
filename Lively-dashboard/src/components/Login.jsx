import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/login.jpg";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthData } from "../redux/AuthSlice";

export default function Login() {
  document.title = "Lively";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email, password);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = axios
      .post("http://localhost:8000/admin/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        console.log(token);
        console.log(`this is res obj`);
        const data = res.data.data;
        dispatch(setAuthData({ user: data.user, token: data.token }));
        localStorage.setItem("token", token);
        toast.success("Logged In Successfully");
        navigate("/");
      })
      .catch((err) => {
        if (err) {
          toast.error("wrong email or password");
        }
      });
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
          <button
            className="border w-full my-5 py-2 bg-green-800 hover:bg-green text-white"
            type="submit "
          >
            Sign In
          </button>
          <div className="flex justify-between">
            <p className="flex items-center cursor-pointer">
              <Link to={"/forgotPassword"} className="mr-2" type="checkbox" />{" "}
              Forgot password
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
