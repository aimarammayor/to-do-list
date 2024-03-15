import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function CreateTask({ onUpdateTasks }) {
  const [task, setTask] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAddTask = () => {
    if (!task.trim()) {
      alert('Poorly, please enter a valid task.');
      return;
    }

    axios
      .post('http://localhost:3001/add', { task: task })
      .then(() => {
        setTask('');
        onUpdateTasks();
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        alert('An error occurred while adding the task. Please try again.');
      });
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter task ..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={handleKeyDown} 
            />
            <div className="input-group-append">
              <button type="button" className="btn btn-custom" onClick={handleAddTask}>
                Add Task
              </button>
            </div>
          </div>
          {showSuccessMessage && <div className="alert alert-success mt-3">Task added successfully.</div>}
        </div>
      </div>
    </div>
  );
}

CreateTask.propTypes = {
  onUpdateTasks: PropTypes.func.isRequired,
};

export default CreateTask;
