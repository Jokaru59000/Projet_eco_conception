const Sequelize = require('sequelize')
require("dotenv").config();

let bdd = new Sequelize("samuelefficom_eco", "397109", "pipicaca1234", {
    dialect: "mysql",
    host: "mysql-samuelefficom.alwaysdata.net"
});

let connect = async () => {
    try {
        await bdd.authenticate();
        console.log("Connection has been established successfully");

    } catch (error) {
        console.error("Unable to connect tot he database", error)
    }
}

module.exports = { connect, bdd }