const express = require('express');
const {Logs} = require('../../models')

const router = express.Router();

//Inserting logs into the database
router.post("/", async (req,res) => {
    const {classGroup, totalStudents, message} = req.body;

    const today = new Date();
    const currentDate = today.toISOString().substring(0, 10);

    await Logs.create({
        classGroup,
        totalStudents,
        message,
        date: currentDate
    })

    res.json("Logs created successfully")
})

//Inserting direct messages to the database
router.post("/directmessagelogs", async (req,res) => {
    const {message} = req.body;

    const today = new Date();
    const currentDate = today.toISOString().substring(0, 10);

    await Logs.create({
        classGroup: "Direct Message",
        totalStudents: 0,
        message,
        date: currentDate
    })

    res.json("Logs created successfully")
})

//retrieving logs from the database
router.get("/getlogs", async(req,res)=>{
    const logs = await Logs.findAll({
        attributes:{exclude:["createdAt", "updatedAt"]},
        order: [['date', 'DESC']]
    });
    res.json(logs)
})


module.exports = router;