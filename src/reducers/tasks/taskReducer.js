import {
  GET__TASKS,
  ADD__TASK,
  VALIDATE__FORM__TASK,
  DELETE__TASK,
  CHANGE__STATE__TASK,
  CHANGE__SELECTED__TASK,
  MODIFY__SELECTED__TASK,
  RESET__TASK__STATE,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET__TASKS:
      return {
        ...state,
        tasks: action.payload,
        errorForm: false,
      };

    case ADD__TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        errorForm: false,
      };

    case VALIDATE__FORM__TASK:
      return {
        ...state,
        errorForm: true,
      };

    case DELETE__TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };

    case CHANGE__STATE__TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };

    case CHANGE__SELECTED__TASK:
      return {
        ...state,
        selectedTask: action.payload,
      };

    case MODIFY__SELECTED__TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
        selectedTask: null,
        errorForm: false,
      };

    case RESET__TASK__STATE:
      return {
        tasks: [],
        errorForm: false,
        selectedTask: null,
      };

    default:
      return state;
  }
};
