const { taskController } = require("../controllers");

const router = require("express").Router();

router.post('/', taskController.createTask)
router.get('/', taskController.getAllTasks)
router.put('/:id', taskController.updateTask)
router.delete('/:id', taskController.deleteTask)
router.get('/status/:status', taskController.getTasksByStatus)
module.exports = router;