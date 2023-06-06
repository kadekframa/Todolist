import express from "express";
import pool from "./connection.js";

const router = express.Router();

router.get("/todolist", async (req, res) => {
  console.info("Get data todolist!");
  try {
    const [result] = await pool.execute(`SELECT * FROM todo`);

    res.json({
      status: 200,
      message: "Get data todo!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error...",
      serverMessage: error,
    });
  }
});

router.get("/todolist/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.execute(`SELECT * FROM todo WHERE id=${id}`);

    res.json({
      status: 200,
      message: "Get data spesific todo!",
      data: result,
    });
  } catch (error) {
    res.json({
      message: "Server error...",
      serverMessage: error,
    });
  }
});

router.post("/todo", async (req, res) => {
  const body = req.body;

  try {
    await pool.execute(
      `INSERT INTO todo (name, isCompleted) VALUES ('${body.name}', '${body.isCompleted}')`
    );

    res.json({
      status: 201,
      message: "Added data successfully!",
      data: body,
    });
  } catch (error) {
    res.json({
      message: "Server error...",
      serverMessage: error,
    });
  }
});

router.put("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    await pool.execute(
      `UPDATE todo SET name='${body.name}', isCompleted='${body.isCompleted}' WHERE id =${id}`
    );

    res.json({
      status: 200,
      message: "Update todo successfully!",
      data: body,
    });
  } catch (error) {
    res.json({
      message: "Server error...",
      serverMessage: error,
    });
  }
});

router.delete("/todo/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await pool.execute(`DELETE FROM todo WHERE id=${id}`);

    const [result] = await pool.execute("SELECT * FROM todo");

    res.json({
      status: 200,
      message: "Delete todo successfully!",
      data: result,
    });
  } catch (error) {
    res.json({
      message: "Server error...",
      serverMessage: error,
    });
  }
});

export default router;
