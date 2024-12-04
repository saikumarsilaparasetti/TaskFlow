const router = require("express").Router();


router.use('/tasks', require('./taskRoutes'))
router.use('*', (req, res) => {
    res.status(404).json({ err: 'Not Found' })
})
module.exports = router