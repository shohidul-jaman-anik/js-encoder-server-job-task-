const express = require('express')
const router = express.Router()

const taskController = require("../controller/task.controller")

router.route('/')
    .get(taskController.getTask)
    .post(taskController.addTask)

router.route('/:id')
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask)

module.exports = router;

