const { successResponse, errorResponse } = require("../../utils")
const services = require('./services')
const { v4: uuidv4} = require('uuid');

const controller  = {
    createTask: async(req, res)=>{
        try {
            const {title, description} = req.body;
            if(!title || !description){
                return errorResponse(res, undefined, "Please provide title and description")
            }
            const id = generateUniqueId();
            const task = {
                id,
                title,
                description,
                status:"pending"
            }
            const taskCreated = services.addTask(task)
            return taskCreated ? successResponse(res, task, "Task created successfully") : errorResponse(res, undefined, "Couldnt create task, Please try again!!")
        } catch (error) {
            errorResponse(res, error, "Couldnt create user, Please try again!!")
        }
    },
    getAllTasks: async(req, res)=>{
        try {
            const tasks = services.readData()
            return successResponse(res, tasks, "Tasks fetched successfully")
        } catch (error) {
            errorResponse(res, error, "Couldnt fetch tasks, Please try again!!")
        }
    },
    updateTask: async(req, res)=>{
        try {
            const {id} = req.params;
            const { status} = req.body;
            if(!status){
                return errorResponse(res, undefined, "Please provide status")
            }

            const tasks = services.readData()
            const taskIndex = tasks.findIndex(task=>task.id === id)
            if(taskIndex === -1){
                return errorResponse(res, undefined, "Task not found")
            }
            const task = tasks[taskIndex]
            
            task.status = status;
            const taskUpdated = services.updateTaskById(id, task)
            return taskUpdated ? successResponse(res, task, "Task updated successfully") : errorResponse(res, undefined, "Couldnt update task, Please try again!!")
        } catch (error) {
            errorResponse(res, error, "Couldnt update task, Please try again!!")
        }
    },
    deleteTask: async(req, res)=>{
        try {
            const {id} = req.params;
            const tasks = services.readData()
            const taskIndex = tasks.findIndex(task=>task.id === id)
            if(taskIndex === -1){
                return errorResponse(res, undefined, "Task not found")
            }
            const taskDeleted = services.deleteTaskById(id)
            return taskDeleted ? successResponse(res, undefined, "Task deleted successfully") : errorResponse(res, undefined, "Couldnt delete task, Please try again!!")
        } catch (error) {
            errorResponse(res, error, "Couldnt delete task, Please try again!!")
        }
    },
    getTasksByStatus: (req, res)=>{
        try {
            const status = req.params.status
            if(!status){
                return errorResponse(res, undefined, "Please provide status")
            }

            const tasks = services.readData()
            const filteredTasks = tasks.filter(task=>task.status === status)
            return successResponse(res, filteredTasks, "Tasks fetched successfully")
        } catch (error) {
            errorResponse(res, error, "Couldnt filter tasks by status, Please try again!!")
        }
    }
}

module.exports = controller


const generateUniqueId = ()=>{
    try {
        let id = uuidv4();
        const tasks = services.readData()
        while(tasks.find(task=>task.id === id)){
            id = uuidv4();
        }
        return id;
    } catch (error) {
        throw error       
    }
}