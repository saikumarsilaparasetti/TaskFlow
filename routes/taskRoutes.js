const { taskController } = require("../controllers");

const router = require("express").Router();

router.post('/tasks', taskController.createTask)
router.get('/tasks', taskController.getAllTasks)
router.put('/tasks/:id', taskController.updateTask)
router.delete('/tasks/:id', taskController.deleteTask)
router.get('/tasks/status/:status', taskController.getTasksByStatus)
module.exports = router;