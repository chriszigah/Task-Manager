var { Task } = require("../models/Task");
var asyncWrapper = require("../middlewares/asyncWrapper");
const { createCustomError } = require("../errors/custom_errors");

exports.createTask = asyncWrapper(async (req, res, next) => {
  const newTask = new Task({
    name: req.body.name,
    completed: req.body.completed,
  });

  const ntask = await newTask.save();

  return res.status(201).json({ ntask });
});

exports.updateTask = async (req, res, next) => {
  try {
    const { name, completed } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(createCustomError("Not Found", 404));
    }

    (task.name = name), (task.completed = completed);

    await task.save();

    res.status(200).json({ task });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find().sort({ date: -1 });

  return res.status(200).json({ Tasks: tasks });
});

exports.getTaskById = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });

  if (!task) {
    return next(createCustomError("Not Found", 404));
  }

  return res.status(200).json({ Task: task });
});

exports.deleteTaskById = asyncWrapper(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  await task.remove();

  return res.status(400).json({ msg: "Task was removed" });
});
