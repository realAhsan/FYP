// import Driver from "../Models/driver.js";
// import Bus from "../Models/bus.js";

// export const AddNewDriver = async (req, res) => {
//   try {
//     const { name, contactNo, busNo } = req.body;
//     const Busobj = await Bus.findOne({ busNo });
//     const busId = Busobj._id;
//     const route = Busobj.route;
//     console.log(busId, route);

//     const newDriver = await Driver.create({
//       name,
//       contactNo,
//       bus: busId,
//       route,
//     });
//     res.status(201).json({ message: "success" });
//     console.log(newDriver);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// export const getDrivers = async (req, res) => {
//   try {
//     const drivers = await Driver.find().populate("bus").populate("route");
//     res.status(200).json(drivers);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching drivers", error });
//   }
// };

// export const getDriverByBus = async (req, res) => {
//   const busNo = req.params.busNo;

//   try {
//     const bus = await Bus.findOne({ busNo });
//     console.log(bus);

//     if (!bus) {
//       throw new Error("Bus not found");
//     }
//     // Find the driver with the matching busNo
//     const driver = await Driver.findOne({ bus: bus._id });
//     console.log(driver);
//     if (!driver) {
//       return res
//         .status(404)
//         .json({ error: `Driver with busNo ${busNo} not found` });
//     }

//     res.json(driver);
//   } catch (err) {
//     console.error("Error fetching driver:", err);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

import Driver from "../Models/driver.js";
import Bus from "../Models/bus.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const secretKey = process.env.JWT_SECRET; // Replace with your actual secret key

export const AddNewDriver = async (req, res) => {
  try {
    const { name, contactNo, busNo, email, password } = req.body;
    const Busobj = await Bus.findOne({ busNo });
    const busId = Busobj._id;
    const route = Busobj.route;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newDriver = await Driver.create({
      name,
      contactNo,
      bus: busId,
      route,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "Driver added successfully", driver: newDriver });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().populate("bus").populate("route");
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drivers", error });
  }
};

export const getDriverByBus = async (req, res) => {
  const busNo = req.params.busNo;

  try {
    const bus = await Bus.findOne({ busNo });

    if (!bus) {
      throw new Error("Bus not found");
    }
    const driver = await Driver.findOne({ bus: bus._id });

    if (!driver) {
      return res
        .status(404)
        .json({ error: `Driver with busNo ${busNo} not found` });
    }

    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const loginDriver = async (req, res) => {
  const { email, password } = req.body;

  try {
    const driver = await Driver.findOne({ email }).populate("bus");

    if (!driver) {
      console.log(`inside !Driver`);
      return res
        .status(401)
        .json({ message: "Authentication failed. Driver not found." });
    }
    console.log(`Email:${email} Password${password}`);
    const isPasswordValid = await bcrypt.compare(password, driver.password);

    if (!isPasswordValid) {
      console.log(`inside !isPasswordValid`);

      return res
        .status(401)
        .json({ message: "Authentication failed. Wrong password." });
    }

    // const token = jwt.sign(
    //   { driverId: driver.driverId, email: driver.email },
    //   secretKey,
    //   {
    //     expiresIn: "1h",
    //   }
    // );

    res
      .status(200)
      .json({ message: "Authentication successful", driver: driver });
  } catch (error) {
    res.status(500).json({ message: "Error logging in driver", error });
  }
};
