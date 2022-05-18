const mongoose = require("mongoose");
const { Schema } = mongoose;

const inventorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name of the inventory item is required."],
    },
    warehouse: {
      type: String,
      default: "N/A",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    comments: {
      type: String,
      default: "N/A",
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory;
