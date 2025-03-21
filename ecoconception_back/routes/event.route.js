const express = require("express");
const eventController = require("./../controller/event.controller")

const router = express.Router();
router.get("/list", eventController.getAll)

router.post("/", eventController.create)

// router.get("list/:id", eventController.getEventById)

module.exports = router;