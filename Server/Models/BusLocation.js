import mongoose from "mongoose";

// Define the schema
const busSchema = new mongoose.Schema({
  BusNo: {
    type: Number,
    required: true,
    unique: true,
  },
  StartLocation: {
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
  },
  CurrentLocation: {
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
  },
  Status: {
    type: String,
    enum: ["Online", "Offline"],
    required: true,
  },
});

// Create the model from the schema
const BusLocation = mongoose.model("BusLocation", busSchema);

// Export the model
export default BusLocation;
