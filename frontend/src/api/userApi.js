
const BASE_URL = "http://127.0.0.1:8000";

export const addUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
};


export const loginUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }); 
  return response.json();
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};