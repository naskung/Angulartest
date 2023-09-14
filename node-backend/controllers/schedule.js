const db = require("../models/index");

const { User, SupportSchedule, Assignment, Worksite } = db;
//db.sequelize.sync();

exports.get_schedule = async (req, res) => {
  try {
    const schedules = await SupportSchedule.findAll({
      attributes: ['id',"start_time", "end_time"],
      include: [
        {
          model: User,
          attributes: [
            "id",
            "username",
            "email",
            "tel",
            "prefix",
            "nickname",
            "firstname",
            "lastname",
            "role",
          ],
        },
        {
          model: Assignment,
          attributes: ["id","assign_id","name"],
        },
        {
          model: Worksite,
          attributes: ["id","site_id","site_name"],
        },
      ],
    });

    // Check if there are no schedules found
    if (!schedules || schedules.length === 0) {
      return res.status(404).json({ message: "No support schedules found." });
    }

    // Respond with the retrieved support schedules
    res.status(200).json(schedules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.get_schedule_id = async (req, res) => {
  try {
    const id = req.params.id;
    const get_id = await SupportSchedule.findByPk(id,{attributes: ['id',"start_time", "end_time"],
    include: [
      {
        model: User,
        attributes: [
          "id",
          "username",
          "email",
          "tel",
          "prefix",
          "nickname",
          "firstname",
          "lastname",
          "role",
        ],
      },
      {
        model: Assignment,
        attributes: ["id","assign_id","name"],
      },
      {
        model: Worksite,
        attributes: ["id","site_id","site_name"],
      },
    ],})
    
    // Check if the schedule was found
    if (!get_id) {
      return res.status(404).json({ message: "Schedule not found." });
    }

    // Respond with the retrieved schedule
    res.status(200).json(get_id);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

