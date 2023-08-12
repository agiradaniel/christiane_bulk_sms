const express = require("express");
const {Students} = require('../../models')
const router = express.Router();
const {Op} = require('sequelize')


//Send student data to the database
router.post('/', async (req, res) => {
    const {name, balance, studentClass, parentContact, lastReminder} = req.body;
    await Students.create({name, balance, studentClass, parentContact, lastReminder})
    res.json("Data inserted successfully")
})

//Query student data from the database for Fee SMS tab
router.post("/studentdata", async (req, res) => {
    try {
        const { studentClass, amount } = req.body;

        const today = new Date();
        const currentDate = today.toISOString().substring(0, 10);

        const whereCondition = {
            balance: { [Op.gte]: amount }
        };
        if (studentClass !== 'All Classes') {
            whereCondition.studentClass = studentClass;
        }

        //query where balance >= amount
        const studentData = await Students.findAll({
            where: whereCondition,
            attributes: ["name", "studentClass", "balance", "parentContact", "lastReminder"]
        });

        res.json(studentData);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

//Query student data from the database for General sms tab
router.post('/studentdatageneral', async (req, res) => {
    try {
        const { studentClass } = req.body;
        const whereCondition = {}

        if (studentClass !== 'All Classes') {
            whereCondition.studentClass = studentClass;
        }

        const generalStudentData = await Students.findAll({
            where: whereCondition,
            attributes: ["name", "studentClass", "balance", "parentContact"]
        });

        res.json(generalStudentData);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: "An error occurred while fetching general student data." });
    }
});



module.exports = router;

