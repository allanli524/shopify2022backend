const mongoose = require("mongoose");
const { Schema } = mongoose;

const warehouseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name of the warehouse is required."],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "address of the warehouse is required"],
    },
    comments: {
      type: String,
      default: "N/A",
    },
    inventory: [],
  },
  { timestamps: true }
);

const Warehouse = mongoose.model("Warehouse", warehouseSchema);
module.exports = Warehouse;
