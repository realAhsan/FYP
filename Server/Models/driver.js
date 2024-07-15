// import mongoose from "mongoose";

// import AutoIncrementFactory from "mongoose-sequence";
// const AutoIncrement = AutoIncrementFactory(mongoose);

// const driverSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   contactNo: {
//     type: String,
//     required: true,
//   },
//   driverId: {
//     type: Number,
//     unique: true,
//   },
//   bus: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Bus",
//   },
//   route: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Route",
//   },
// });

// driverSchema.plugin(AutoIncrement, { inc_field: "driverId" });

// const Driver = mongoose.model("Driver", driverSchema);

// export default Driver;

import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = AutoIncrementFactory(mongoose);

const driverSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  driverId: {
    type: Number,
    unique: true,
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

driverSchema.plugin(AutoIncrement, { inc_field: "driverId" });

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;
