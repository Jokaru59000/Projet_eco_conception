const { where } = require("sequelize");
require("dotenv").config()
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
        let listEvent = await Event.findAll({ order: [["date", "DESC"]] });
        res.status(200).json(listEvent)

    } catch (error) {
        console.log(error)
        res.status(400).end()
    }
}

exports.getById = async (req, res, next) => {
    const idReq = req.params.id;
    try {
        let listEvent = await Event.finOne({ where: { id: idReq } });
        res.status(200).json(listEvent)

    } catch (error) {
        console.log(error)
        res.status(400).end()
    }
}

exports.getPage = async (req,res,next) => {
    const page = req.params.page;
    console.log(page)
    
    try {
        let elements = await Event.findAll({
            offset: (page-1)* parseInt(process.env.PAGINATION), 
            limit: parseInt(process.env.PAGINATION),
            order: [["date", "DESC"]]
        })
        console.log(elements)
        res.status(200).json({
            page: page,
            total: elements.length,
            items: elements
        })
    } catch(error) {
        console.log(error)
        res.status(400).end()
    }
}
