import express from "express";
import ToDo from "../models/ToDo.models.mjs";

const router = express.Router();

//get all Todos
router.get("/", async (req, res) => {
  try {
    const toDos = await ToDo.find();
    return res.status(200).json(toDos);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
});

//add new Todo
router.post("/", async (req, res) => {
  const newTodo = new ToDo({
    text: req.body.text,
  });

  try {
    const newToDo = await ToDo.save(newTodo);
    res.status(201).json(newToDo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//update Todo
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const toDo = await ToDo.findById(id);
    if (!toDo) return res.status(404).json({ message: "Todo not found" });
    if (req.body.text !== undefined) {
      toDo.text = eq.body.text;
    }
    if (req.body.completed !== undefined) {
      toDo.completed = req.body.completed;
    }

    const updatdTodo = toDo.save();
    return res.json(updatdTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//delete todo
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTodo = await ToDo.findByIdAndDelete(id);
    res.json({ message: "ToDo deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
