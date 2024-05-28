import axios from "axios";

export function getUsers() {
  return axios.get(`https://hockeyapp.onrender.com/api/users`).then((res) => {
    const allUsers = res.data.users;
    return allUsers;
  });
}
