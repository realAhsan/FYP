import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./components/Dashboard";
import Drivers from "./components/Drivers";
import Busses from "./components/Busses";
import Users from "./components/Users";
import BusRoutes from "./components/BusRoutes";
import Complaints from "./components/Complaints";
import Login from "./components/Login";
import NewAdmin from "./components/NewAdmin";
import AddNewRoute from "./components/Routes/AddNewRoute";
import AddNewBus from "./components/Busses/AddNewBus";
import AddNewDriver from "./components/Drivers/AddNewDriver";
import Notifications from "./components/Notifications";

import { Toaster } from "react-hot-toast";

import PrivateRoute from "./PrivateRoute";
function App() {
  // window.addEventListener("beforeunload", () => {
  //   localStorage.removeItem("token"); // Replace 'yourKey' with the key you want to remove
  // });
  const token = localStorage.getItem("token");

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/drivers"
              element={
                <PrivateRoute>
                  <Drivers />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/busses"
              element={
                <PrivateRoute>
                  <Busses />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/routes"
              element={
                <PrivateRoute>
                  <BusRoutes />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/complaints"
              element={
                <PrivateRoute>
                  <Complaints />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/newAdmin"
              element={
                <PrivateRoute>
                  <NewAdmin />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/newBus"
              element={
                <PrivateRoute>
                  <AddNewBus />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/newRoute"
              element={
                <PrivateRoute>
                  <AddNewRoute />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/newDriver"
              element={
                <PrivateRoute>
                  <AddNewDriver />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <Notifications />
                </PrivateRoute>
              }
            ></Route>
          </Route>

          <Route path="/admin" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
