import express from "express";
import { createNew, deleteTask, getAll } from "../controllers/controller.js";

const router = express.Router();

router.route("/").get(getAll).post(createNew);

router.route("/:id").delete(deleteTask);

export default router;
