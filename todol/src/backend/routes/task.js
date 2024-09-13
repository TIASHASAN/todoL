const express = require('express');
const { addTask, getTasks, addTaskElement } = require('../controllers/taskController');
const router = express.Router();

router.post('/add-task', addTask);
router.get('/tasks/:element_id', getTasks);
router.post('/add-task-element', addTaskElement);

module.exports = router;
