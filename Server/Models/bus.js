import mongoose from "mongoose";
import validator from "validator";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);
const busSchema = mongoose.Schema({
  busNo: {
    type: String,
    required: true,
    unique: true,
  },
  busId: {
    type: Number,
    unique: true,
  },
  busTimings: {
    departure: {
      type: [String], // Assuming times are stored as strings (e.g., "08:00", "14:30")
      required: true,
    },
    arrival: {
      type: [String],
      required: true,
    },
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route",
    required: true,
  },
});
busSchema.plugin(AutoIncrement, { inc_field: "busId" });

const Bus = mongoose.model("Bus", busSchema);

export default Bus;
