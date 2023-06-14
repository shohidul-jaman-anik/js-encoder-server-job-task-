const express = require('express')
const router = express.Router()

const taskController = require("../controller/task.controller")

router.route('/:id')
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask)

router.route('/')
    .get(taskController.getTask)
    .post(taskController.addTask)



module.exports = router;

