import axios from "axios";

export function deleteUserById(user_id) {
  return axios
    .delete(`https://hockeyapp.onrender.com/api/users/${user_id}`)
    .then((res) => {
      return;
    });
}
