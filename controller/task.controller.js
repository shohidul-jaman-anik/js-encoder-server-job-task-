const Task = require("../models/task.model")

module.exports.getTask = async (req, res) => {
    try {
        const result = await Task.find({})

        res.status(200).json({
            status: "Success",
            message: "Get task successfully",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get task",
            data: result
        })
    }
}


module.exports.addTask = async (req, res) => {
    try {
        const result = await Task.create(req.body)

        res.status(200).json({
            status: "Success",
            message: "Insert task successfully"
        })
    } catch (error) {

        res.status(400).json({
            status: "fail",
            message: "Task couldn't insert",
            error: error.message
        })
    }
}


module.exports.updateTask = async (req, res, next) => {
    const { id } = req.params
    try {
        const { id } = req.body
        const result = await Task.updateOne({ _id: id }, req.body, { runValidators: true })
        if (!result.nModified) {
            res.status(200).json({
                status: "Fail",
                message: "Couldn't update the Task"
            })
        }
        res.status(200).json({
            status: "Success",
            message: "Successfully update the Task",
            data: result
        })
    } catch (error) {
        res.status(200).json({
            status: "Fail",
            message: "Couldn't update the Task",
            error: error.message
        })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Task.deleteOne({ _id: id })

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "Fail",
                error: "Could't delete the task"
            })
        }
        res.status(200).json({
            status: "Success",
            message: "Task Delete Successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Task couldn't Delete Successfully",
            error: error.message
        })
        console.log(error, 'error')
    }
}

