import mongoose from "mongoose";
import BusLocation from "../Models/BusLocation.js";

export const SaveLocation = async (req, res) => {
  try {
    const { BusNo, StartLocation, CurrentLocation, Status } = req.body;

    const newBus = new BusLocation({
      BusNo,
      StartLocation,
      CurrentLocation,
      Status,
    });

    await newBus.save();
    res.status(201).send({ message: "Bus saved successfully", bus: newBus });
  } catch (error) {
    res.status(500).send({ message: "Error saving bus", error });
  }
};

export const getLocation = async (req, res) => {
  try {
    const busNo = req.params.busNo;

    const bus = await BusLocation.findOne(
      { BusNo: busNo },
      "StartLocation CurrentLocation Status"
    );

    if (!bus) {
      return res.status(404).send({ message: "Bus not found" });
    }

    res.status(200).send(bus);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving bus", error });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const busNo = req.params.busNo;
    const { StartLocation, CurrentLocation, Status } = req.body;
    console.log("start location:", StartLocation);
    console.log("current location:", CurrentLocation);
    console.log("Status:", Status);

    const bus = await BusLocation.findOneAndUpdate(
      { BusNo: busNo },
      { StartLocation, CurrentLocation, Status },
      { new: true, runValidators: true }
    );

    if (!bus) {
      return res.status(404).send({ message: "Bus not found" });
    }

    res.status(200).send({ message: "Bus updated successfully", bus });
  } catch (error) {
    res.status(500).send({ message: "Error updating bus", error });
  }
};

// {
//     "BusNo":"1",
//     "StartLocation":{
//         "longitude":"0",
//           "latitude":"0",
//         },
//     "CurrentLocation":{
//         "longitude":"0",
//           "latitude":"0",
//         },
//        "Status":"Offline"
// }
