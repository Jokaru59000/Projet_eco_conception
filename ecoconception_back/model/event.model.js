const { DataTypes } = require("sequelize");
const { bdd } = require("../framework/connexion");

const Event = bdd.define("event",
    {
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        date: {
            type: DataTypes.DATE(),
            allowNull: false
        },

        place: {
            type: DataTypes.TEXT()
        },

        description: {
            type: DataTypes.TEXT()
        },

        duration: {
            type: DataTypes.TIME()
        }
    }
)

module.exports = Event