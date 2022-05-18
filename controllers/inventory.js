const { mongoose } = require("../db/mongoose");
const Inventory = require("../models/Inventory");
const Warehouse = require("../models/Warehouse");

exports.create_inv = async (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("Issue with mongoose connection");
    res.status(500).json("Internal server error");
    return;
  }

  const { name, warehouse, comments } = req.body;
  //check if warehouse exists
  if (warehouse) {
    const exist = await Warehouse.findOne({ name: warehouse });
    if (!exist) {
      res.json("Warehouse does not exist");
    }
  }
  if (name) {
    const item = new Inventory({
      name: name,
      warehouse: warehouse,
      comments: comments,
      isDeleted: false,
    });
    let newInv;
    try {
      //create
      newInv = await item.save();

      //add to warehouse
      await Warehouse.updateOne(
        { name: warehouse },
        {
          $push: {
            inventory: newInv._id.toString(),
          },
        }
      );
      res.status(200).json(newInv);
    } catch (err) {
      res.status(500).json(`Inventory creation error ${err}`);
    }
  }
};

exports.edit_inv = async (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("Issue with mongoose connection");
    res.status(500).json("Internal server error");
    return;
  }

  const { id, name, warehouse, comments } = req.body;

  try {
    let result = await Inventory.findById(id);
    if (!result) {
      res.status(400).json("Inventory does not exist error");
    }
    //check for warehouse change
    if (warehouse && result.warehouse != warehouse) {
      //locate new warehouse and add id
      await Warehouse.updateOne(
        { name: warehouse },
        {
          $push: {
            inventory: id,
          },
        }
      );

      //delete entry from existing warehouse
      await Warehouse.updateOne(
        { name: result.warehouse },
        {
          $pull: {
            inventory: id,
          },
        }
      );
    }
    //update inventory object
    const changes = {
      name: name,
      warehouse: warehouse,
      comments: comments,
    };
    await Inventory.updateOne(
      { _id: id },
      {
        $set: changes,
      }
    );
    res.status(200).json(changes);
  } catch (err) {
    res.status(500).json(`Inventory edit error: ${err}`);
  }
};

exports.delete_inv = async (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("Issue with mongoose connection");
    res.status(500).json("Internal server error");
    return;
  }
  //find the item by id and set delete to true
  const id = req.body.id;
  try {
    //check if inventory exists
    let item = await Inventory.findById(id);
    if (!item) {
      res.status(400).json("Inventory item not found");
    }
    //remove item from inventory
    await Warehouse.updateOne(
      { name: item.warehouse },
      {
        $pull: {
          inventory: id,
        },
      }
    );

    //change inventory to deleted
    await Inventory.updateOne(
      { _id: id },
      {
        $set: {
          isDeleted: true,
        },
      }
    );
    res.status(200).json(id);
  } catch (err) {
    res.status(500).json(`Inventory delete error: ${err}`);
  }
};

exports.get_inv = async (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("Issue with mongoose connection");
    res.status(500).json("Internal server error");
    return;
  }
  const id = req.params.id;
  try {
    let info = await Inventory.findOne({ _id: id });
    if (!info || info.isDeleted) {
      res.status(404).json("Inventory object not found");
    }
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(`Inventory get_one error: ${err}`);
  }
};

exports.get_inv_all = async (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("Issue with mongoose connection");
    res.status(500).json("Internal server error");
    return;
  }

  try {
    let result = await Inventory.find({ isDeleted: false });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`Inventory find all error: ${err}`);
  }
};
