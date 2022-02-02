const express = require("express");

const httpController = require("../controllers/http");

const router = express.Router();

router.get("/api/resolvestatus", httpController.resolvestatus);
router.post("/api/getcustomerorderslist", httpController.getcustomerorderslist);
router.post("/api/camundarequest", httpController.camundarequest);

module.exports = router;
