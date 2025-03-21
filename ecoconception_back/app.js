const express = require('express');
const { connect } = require("./framework/connexion")
const { sync } = require("./framework/sync")
const eventRouter = require("./routes/event.route.js")
var cors = require('cors')

const app = express();
const database = async () => {
    await connect();
    // await sync();
}

database();
app.use(express.json())
app.use(cors())
// app.get("/", (res, req,) => {
//     console.log("ok")
// })

app.use('/event', eventRouter)
module.exports = app;