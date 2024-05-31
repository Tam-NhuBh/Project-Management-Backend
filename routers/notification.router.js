const express = require('express');
const router = express.Router();
const asyncMiddelware = require("../middlewares/asyncHandle");
const {

    list,
  } = require("../controllers/notification.controller");
// router.route("/:id").get(asyncMiddelware(list));
router.route("/:user").get(asyncMiddelware(list));
module.exports = router;
