import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", Schema);

export default Task;
