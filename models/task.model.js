const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['in progress', 'completed', 'pending'],
    default: 'pending'
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
