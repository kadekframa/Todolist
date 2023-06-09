import { useEffect, useState } from "react";
import Form from "./components/Form";
import Completed from "./components/Completed";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(true);
  const [editTodo, setEditTodo] = useState(false);

  useEffect(() => {
    // Get all data todo.
    if (status) {
      getAllTodo();
      setStatus(false);
    }

    // Set input where there is data want to update (edit)
    if (editTodo) {
      setInput(editTodo.name);
    } else {
      setInput("");
    }
  }, [status, setStatus, editTodo, setInput]);

  // Get all todo data function.
  const getAllTodo = async () => {
    try {
      const data = await fetch("http://localhost:4000/api/todolist", {
        method: "GET",
      });
      const result = await data.json();
      setTodos(result.data);
    } catch (error) {
      console.info(error);
    }
  };

  // handleFormChange function will set the input state when there is data typing in form by user.
  const handleFormChange = (event) => {
    setInput(event.target.value);
    console.info(event.target.value);
  };

  // updateTodo function will run when editTodo state is true.
  const updateTodo = async (id, isCompleted) => {
    try {
      await fetch(`http://localhost:4000/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: input,
          isCompleted: isCompleted,
        }),
      });

      setInput("");
      setStatus(!status);
    } catch (error) {
      console.info(error);
    }

    setEditTodo(false);
  };

  // submitTodo function is use to submit the todo data. This function will check the editTodo state, if the state is true the function will update todo item which user want to edit.
  const submitTodo = async (event) => {
    event.preventDefault();
    setStatus(!status);

    if (!editTodo) {
      try {
        await fetch("http://localhost:4000/api/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: input,
            isCompleted: "false",
          }),
        });

        setInput("");
        setStatus(!status);
      } catch (error) {
        console.info(error);
      }
    } else {
      updateTodo(editTodo.id, editTodo.isCompleted);
    }
  };

  // handleCheck function is use to change the status todo to complete.
  const handleCheck = async (id, name) => {
    try {
      await fetch(`http://localhost:4000/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          isCompleted: "true",
        }),
      });

      setStatus(!status);
    } catch (error) {
      console.info(error);
    }
  };

  // handleDelete function is use to delete todo item which want to delete when user click the trash button.
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/todo/${id}`, {
        method: "DELETE",
      });

      setStatus(!status);
    } catch (error) {
      console.info(error);
    }
  };

  // handleEdit function is use to get spesific todo item which want to edit by user. And will set the data into editTodo state.
  const handleEdit = async (id) => {
    const showTodo = await fetch(`http://localhost:4000/api/todolist/${id}`, {
      method: "GET",
    });
    const response = await showTodo.json();

    setEditTodo(response.data[0]);
    console.info(response.data[0]);
  };

  return (
    <>
      <div className="flex justify-center items-center w-[100vw] h-full bg-gradient-to-r from-orange-300 via-orange-100 to-orange-300 py-6">
        <div className="w-11/12 lg:w-[46%] h-full bg-[#294054] text-white px-10 py-8 rounded-lg shadow-[4px_4px_32px_16px_rgba(0,0,0,0.3)]">
          <p className="text-center text-3xl font-semibold">Todo-List</p>
          <Form
            input={input}
            submitTodo={submitTodo}
            handleFormChange={handleFormChange}
            editTodo={editTodo}
          />

          <hr className="my-6 opacity-20" />

          {/* To Do */}
          <p className="text-xs text-gray-400 px-2 uppercase mb-4">To Do</p>
          {todos &&
            todos
              .filter((result) => {
                return result.isCompleted === "false";
              })
              .map((response) => {
                return (
                  <Todo
                    key={response.id}
                    id={response.id}
                    name={response.name}
                    handleCheck={handleCheck}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                );
              })}

          {/* Completed */}
          <p className="text-xs text-gray-400 px-2 uppercase mt-6 mb-4">
            Completed
          </p>
          {todos &&
            todos
              .filter((result) => {
                return result.isCompleted === "true";
              })
              .map((response) => {
                return (
                  <Completed
                    key={response.id}
                    id={response.id}
                    name={response.name}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
}

export default App;
