const Event = require("./../model/event.model")

exports.create = async (req, res, next) => {
    let event = await Event.create(req.body.create);
    res.status(201).json(event)
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