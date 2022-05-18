const express = require("express");
const router = express.Router();

const {
  create_warehouse,
  get_warehouse,
  get_warehouse_all,
} = require("../controllers/warehouse");

router.route("/create").post(create_warehouse);

router.route("/get/:name").get(get_warehouse);

router.route("/get_all").get(get_warehouse_all);

module.exports = router;
