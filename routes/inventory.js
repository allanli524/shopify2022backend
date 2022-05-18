const express = require("express");
const router = express.Router();

const {
  create_inv,
  edit_inv,
  delete_inv,
  get_inv,
  get_inv_all,
} = require("../controllers/inventory");

router.route("/create").post(create_inv);

router.route("/edit").post(edit_inv);

router.route("/delete").post(delete_inv);

router.route("/get/:id").get(get_inv);

router.route("/get_all").get(get_inv_all);

module.exports = router;
