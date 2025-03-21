const express = require("express");
const eventController = require("./../controller/event.controller")

const router = express.Router();
router.get("/list", eventController.getAll)

router.post("/add", eventController.create)

router.get("/:id", eventController.getById)

module.exports = router;