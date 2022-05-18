const { mongoose } = require("../db/mongoose");
const Inventory = require("../models/Inventory");
const Warehouse = require("../models/Warehouse");
exports.create_warehouse = async (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }
  const { name, address, comments } = req.body;
  //check if warehouse exists
  if (name) {
    const exist = await Warehouse.findOne({ name: name });
    if (exist) {
      res.status(400).send("Warehouse name already taken");
    }
  } else {
    res.status(400).send("Warehouse name cannot be empty");
  }
  let data = {
    name: name,
    address: address,
    comments: comments,
    inventory: [],
  };
  let newWarehouse;
  try {
    //create
    newWarehouse = await Warehouse.create(data);
    res.send(newWarehouse);
  } catch (err) {
    res.status(500).send(`Warehouse creation error ${err}`);
  }
};

exports.get_warehouse = async (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  const name = req.params.name;
  try {
    let info = await Warehouse.findOne({ name: name });
    if (!info) {
      res.status(404).json("Warehouse object not found");
    }
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(`Warehouse get_one error: ${err}`);
  }
};

exports.get_warehouse_all = async (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("Issue with mongoose connection");
    res.status(500).json("Internal server error");
    return;
  }

  try {
    let result = await Warehouse.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`Warehouse get all error: ${err}`);
  }
};
