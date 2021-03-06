import React, { useContext } from 'react';
import useInput from '../../hooks/useInput';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

function TaskForm() {
  const { currentProject } = useContext(projectContext);

  const {
    setAddTask,
    setErrorForm,
    errorForm,
    selectedTask,
    setModifyTask,
  } = useContext(taskContext);

  const [value, handleChange, setValues] = useInput({
    name: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.name) {
      setErrorForm();
    } else if (selectedTask) {
      setModifyTask({ ...selectedTask, ...value });
      e.target.reset();
      setValues({ name: '' });
    } else {
      setAddTask({
        ...value,
        projectId: currentProject._id,
        state: false,
      });
    }
    
    e.target.reset();
    setValues({ name: '' });
  };

  if (!currentProject) return null;

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="container-input">
          <input
            type="text"
            className="input-text"
            placeholder={selectedTask ? selectedTask.name : 'Task Name...'}
            name="name"
            onChange={handleChange}
          />
        </div>

        <div className="container-input">
          <input
            type="submit"
            className="btn btn-primary btn-submit btn-block"
            value={selectedTask ? 'Edit Task' : 'Add Task'}
          />
        </div>
      </form>

      {errorForm ? (
        <p className="message error">Task name is required</p>
      ) : null}
    </div>
  );
}

export default TaskForm;
