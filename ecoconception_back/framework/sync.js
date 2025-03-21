const { bdd } = require("./connexion.js")

const Event = require("./../model/event.model.js")

const sync = async () => {
    await bdd.sync({ force: true });
}

module.exports = { sync };