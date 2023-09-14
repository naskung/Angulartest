const express = require("express");
const router = express.Router();

const { get_schedule,get_schedule_id,createSupportSchedule,updateSupportSchedule } = require("../controllers/schedule");

router.get("/get_schedule", get_schedule);
router.get("/get_schedule/:id", get_schedule_id);
router.post("/create_schedule",createSupportSchedule);
router.put("/put_schedule/:id",updateSupportSchedule);

module.exports = router;
