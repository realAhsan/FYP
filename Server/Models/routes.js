import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = AutoIncrementFactory(mongoose);

const routeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  no: {
    type: Number,
    unique: true,
    required: [true, "Route no is required"],
  },
  Id: {
    type: Number,
  },
  startPoint: {
    type: String,
  },
  endPoint: {
    type: String,
  },
});
routeSchema.plugin(AutoIncrement, { inc_field: "Id" });

const Route = mongoose.model("Route", routeSchema);

export default Route;
