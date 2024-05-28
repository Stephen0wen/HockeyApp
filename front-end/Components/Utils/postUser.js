import axios from "axios";

export function postUser(name, team, email, password) {
  return axios
    .post(`https://hockeyapp.onrender.com/api/users`, {
      user_name: name,
      team_name: team,
      user_roles: ["player_bool", "sec_bool"],
      user_email: email,
      user_password: password,
    })
    .then((res) => {
      const newUser = res.data.user;
      return newUser;
    });
}
