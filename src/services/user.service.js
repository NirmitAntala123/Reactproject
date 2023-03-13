import axios from "axios";

axios.defaults.withCredentials = true

const API_URL = "http://localhost:4000/";
const headers = {
  "x-access-token": localStorage.getItem("token"),
};
const getAllUser = async () => {
  return await axios.get(API_URL + "users", {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
};

const createUser = (user) => {
  return axios.post(API_URL + "users/create-user", user, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
};

const updateUser = (newUser) => {
  return axios.put(API_URL + "users/update-user/" + newUser._id, newUser, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
};

const deleteUser = (_id) => {
  return axios.delete(API_URL + "users/delete-user/" + _id, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
};
const UserService = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
};

export default UserService;
