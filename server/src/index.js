const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const db = require("../models")

//Routers
const StudentsRouter = require('./routes/Students');
app.use("/data", StudentsRouter)
const SmsRouter = require('./routes/Sendsms');
app.use("/sendsms", SmsRouter)
const LogsRouter = require('./routes/Logs');
app.use("/logs", LogsRouter)

db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log("Server running on port 3001")
    })
})

