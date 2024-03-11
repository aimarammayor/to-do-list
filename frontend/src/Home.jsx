import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import axios from "axios";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  // Solicitud HTTP GET al servidor para obtener el listado de tareas desde el backend.
  const fetchTodos = () => {
    axios
      .get("http://localhost:3001/")
      .then((result) => {
        setTodos(result.data);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id, done) => {
    axios
      .put("http://localhost:3001/update/" + id, { done: !done })
      .then(() => {
        fetchTodos(); // Actualiza la lista de tareas después de cambiar el estado
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .put("http://localhost:3001/delete/" + id)
      .then(() => {
        fetchTodos(); // Actualiza la lista de tareas después de eliminar una tarea
      })
      .catch((err) => console.log(err));
  };

  const onUpdateTasks = () => {
    fetchTodos(); // Actualiza la lista de tareas después de agregar una nueva tarea
  };

  return (
    <div className="home  vh-100">
      <h1 className="to-do-list">TO DO LIST</h1>
      <CreateTask onUpdateTasks={onUpdateTasks} />
      {todos.length === 0 ? (
        <div>
          <h2 className="no-register">No records</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className="task">
            <div
              className="checkbox"
              onClick={() => handleEdit(todo._id, todo.done)}
            >
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
