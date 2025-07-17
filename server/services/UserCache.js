let userList = [];

export const setUsers = (users) => {
  userList = [...users]; // deep copy
};

export const getUsers = () => {
  return [...userList];  // defensive copy
};