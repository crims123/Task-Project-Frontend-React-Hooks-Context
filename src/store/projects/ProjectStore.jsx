import React, { useReducer } from 'react';
import projectContext from '../../context/projects/projectContext';
import projectReducer from '../../reducers/projects/projectReducer';
import axiosClient from '../../config/api';
import {
  GET__PROJECTS,
  GET__PROJECTS__ERROR,
  SHOW__PROJECT,
  ADD__PROJECT,
  ADD__PROJECT__ERROR,
  VALIDATE__FORM,
  CURRENT__PROJECT,
  DELETE__PROJECT,
  DELETE__PROJECT__ERROR,
  RESET__PROJECT__STATE,
} from '../../types';

function ProjectStore(props) {
  const initialState = {
    showProject: false,
    projects: null,
    projectsError: false,
    errorForm: false,
    currentProject: null,
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  const setGetProjects = async () => {
    try {
      const projects = await axiosClient.get('/api/projects');

      dispatch({
        type: GET__PROJECTS,
        payload: projects.data.data.projects,
      });
    } catch (error) {
      dispatch({
        type: GET__PROJECTS__ERROR,
      });
    }
  };

  const setShowProject = (value) => {
    dispatch({
      type: SHOW__PROJECT,
      payload: value,
    });
  };

  const setAddProject = async (values) => {
    try {
      const project = await axiosClient.post('/api/projects', values);

      dispatch({
        type: ADD__PROJECT,
        payload: project.data.data.project,
      });
    } catch (error) {
      dispatch({
        type: ADD__PROJECT__ERROR,
        payload: error,
      });
    }
  };

  const setErrorForm = (msg) => {
    dispatch({
      type: VALIDATE__FORM,
      payload: msg,
    });
  };

  const setCurrentProject = (project) => {
    dispatch({
      type: CURRENT__PROJECT,
      payload: project,
    });
  };

  const setDeleteProject = async (project) => {
    try {
      await axiosClient.delete(`/api/projects/${project._id}`);

      dispatch({
        type: DELETE__PROJECT,
        payload: project._id,
      });

      setGetProjects();
    } catch (error) {
      dispatch({
        type: DELETE__PROJECT__ERROR,
        payload: error,
      });
    }
  };

  const setResetProjectState = () => {
    dispatch({
      type: RESET__PROJECT__STATE,
    });
  };

  return (
    <projectContext.Provider
      value={{
        setGetProjects,
        showProject: state.showProject,
        setShowProject,
        projects: state.projects,
        projectsError: state.projectsError,
        setAddProject,
        errorForm: state.errorForm,
        setErrorForm,
        currentProject: state.currentProject,
        setCurrentProject,
        setDeleteProject,
        setResetProjectState,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
}

export default ProjectStore;
