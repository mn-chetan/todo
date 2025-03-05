import { projects } from "./state";

export const getProjectState = () => {
  const storedState = localStorage.getItem("projectState");
  return storedState ? JSON.parse(storedState) : projects;
};

export const setProjectState = (newState) => {
  localStorage.setItem("projectState", JSON.stringify(newState));
};
