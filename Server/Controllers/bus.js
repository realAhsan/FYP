import Bus from "../Models/bus.js";
import BusLocation from "../Models/BusLocation.js";

export const getBuses = async (req, res) => {
  try {
    const busses = await Bus.find().populate("route");
    res.json(busses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addNewBus = async (req, res) => {
  try {
    const { busNo, busId, busTimings, route } = req.body;
    // const route = `ObjectId('${routeref}')`;
    const busLocation = {
      BusNo: busNo,
      StartLocation: {
        longitude: 0,
        latitude: 0,
      },
      CurrentLocation: {
        longitude: 0,
        latitude: 0,
      },
      Status: "Offline",
    };
    const location = await BusLocation.create(busLocation);
    const savedBus = await Bus.create({ busNo, busId, busTimings, route });
    console.log(location);
    res.status(201).json({ message: "success" });
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err);
    console.log(err.message);
  }
};

export const updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const { busNo, busId, busTimings, route } = req.body;
    const updatedBus = await Bus.findByIdAndUpdate(
      id,
      { busNo, busId, busTimings, route },
      { new: true, runValidators: true }
    );
    if (!updatedBus) {
      return res.status(404).json({ error: "Route not found" });
    }
    res.json(updatedBus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBus = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBus = await Bus.findByIdAndDelete(id);
    if (!deletedBus) {
      return res.status(404).json({ error: "Bus not found" });
    }
    res.json({ message: "Bus deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getBus = async (req, res) => {
  try {
    console.log(`hello from get 1 bus`);
    const busNo = req.params.busNo;
    const bus = await Bus.findOne({ busNo }).populate("route");

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
