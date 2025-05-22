import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingToDo, setEditingToDo] = useState(null);
  const [editedText, setEditedText] = useState("");

  //add todo function
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post("/api/todos/", { text: newTodo });
      setNewTodo("");
      setTodos([...todos, response.data]);
    } catch (error) {
      console.log("Error adding todo ", error);
    }
  };

  //fetching all the todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos/");
      setTodos(response.data);
    } catch (error) {
      console.log("Error adding todo ", error);
    }
  };

  //USE effect
  useEffect(() => {
    fetchTodos();
  }, []);

  //editing methiod
  const startediting = (todo) => {
    setEditingToDo(todo._id);
    setEditedText(todo.text);
  };

  //update todo in backend
  const updateTodo = async (id) => {
    try {
      const response = await axios.patch(`api/todos/${id}`, {
        text: editedText,
      });
      console.log(response.data);
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditingToDo(null);
    } catch (error) {
      console.log("Error adding todo ", error);
    }
  };

  //delete method
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`api/todos/${id}`);
      console.log(response);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log("Error adding todo ", error);
    }
  };

  //return
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Task Manager
        </h1>
        <form
          className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg"
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done ?"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600
           text-white px-4 py-2 rounded-md font-medium cursor-pointer"
          >
            Add Task
          </button>
        </form>
        <div className="mt-4">
          {todos.length !== 0 ? (
            <div className="flex flex-col gap-4">
              {todos.map((todo) => (
                <div key={todo._id}>
                  {editingToDo === todo._id ? (
                    <div className="flex items-center gap-x-3">
                      <input
                        className="flex-1 p-3 border rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner"
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                      <div className="flex gap-x-2">
                        <button
                          onClick={() => updateTodo(todo._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
                        >
                          <MdOutlineDone />
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-200 text-gray rounded-lg hover:bg-gray-300 cursor-pointer"
                          onClick={(e) => setEditingToDo(null)}
                        >
                          <IoClose />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-4">
                          <button
                            onClick={() => complete(todo._id)}
                            className={`h-6 w-6 border rounded-full flex items-center justify-center ${
                              todo.completed
                                ? "bg-green-500 border-green-500"
                                : "border-gray-300 hover:border-blue-400"
                            }`}
                          >
                            {todo.completed && <MdOutlineDone />}
                          </button>
                          <span className="text-gray-800 font-medium">
                            {todo.text}
                          </span>
                        </div>
                        <div className="flex gap-x-2">
                          <button
                            className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200"
                            onClick={(e) => startediting(todo)}
                          >
                            <MdModeEditOutline />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo._id)}
                            className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-blue-50 duration-200"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>No Todos</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default App;
