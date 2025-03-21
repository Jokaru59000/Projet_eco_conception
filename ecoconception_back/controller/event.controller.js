const { where } = require("sequelize");
const Event = require("./../model/event.model")

exports.create = async (req, res, next) => {
    try {
        console.log(req.body.event)
        let event = await Event.create(req.body.event);
        res.status(201).json(event)

    } catch (error) {
        console.log(error.message)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        let listEvent = await Event.findAll();
        res.status(200).json(listEvent)

    } catch (error) {
        console.log(error)
        //
        //  res.status(400).end()
    }
}

exports.getById = async (req, res, next) => {
    const idReq = req.params.id;
    try {
        let listEvent = await Event.findOne({ where: { id: idReq } });
        res.status(200).json(listEvent)

    } catch (error) {
        console.log(error)

        //  res.status(400).end()
    }
}
