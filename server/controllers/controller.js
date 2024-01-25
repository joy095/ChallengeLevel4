import Task from "../models/model.js";
import asyncHandler from "express-async-handler";

const getAll = asyncHandler(async (req, res) => {
  const task = await Task.find().lean();

  if (!task?.length) {
    return res.status(400).json({ message: "No Task found" });
  }

  res.json(task);
});

const createNew = asyncHandler(async (req, res) => {
  const { task, priority } = req.body;

  // Confirm data
  if (!task || !priority) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const taskObject = { task, priority };

  // Create new Task
  const newTask = await Task.create(taskObject);

  if (newTask) {
    //created
    res.status(201).json({ message: `New Task: ${task} created` });
  } else {
    res.status(400).json({ message: "Invalid Task data received" });
  }
});

const deleteTask = async (req, res) => {
  try {
    const tasks = await Task.findById(req.params.id);
    if (tasks) {
      await Task.deleteOne({ _id: tasks._id });

      res.json({
        message: `Tasks Name: ${tasks.task} with ID: ${tasks._id} removed`,
      });
    } else {
      res.status(404).json({ message: "Tasks not found." });
    }
  } catch (error) {
    console.log("Error in deleting Task:", error);
  }
};

export { createNew, deleteTask, getAll };
