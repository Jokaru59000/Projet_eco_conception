const express = require('express');

var cors = require('cors')

const app = express();
// const database = async () => {
//     await connect();
//     await sync();
//     await dataset()
// }

// database();
app.use(express.json())
app.use(cors())
app.get("/", (res, req,) => {
    console.log("ok")
})
module.exports = app;