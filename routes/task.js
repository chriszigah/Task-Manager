var express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");

// @route POST api/posts
// @desc Create a post
// @access Private

router.post("/", taskController.createTask);

// @route PATCH /task/update/:id
// @desc Update a task by id
// @access Private

router.patch("/:id", taskController.updateTask);

// @route GET /tasks
// @desc Get all tasks
// @access Private

router.get("/", taskController.getAllTasks);

// @route GET /tasks/:id
// @desc Get task by ID
// @access Private

router.get("/:id", taskController.getTaskById);

// @route DELETE /tasks/:id
// @desc Delete task by ID
// @access Private

router.delete("/:id", taskController.deleteTaskById);

module.exports = router;
