import axios from "axios";

export function getTeams() {
  return axios.get("https://hockeyapp.onrender.com/api/teams").then((teams) => {
    let teamList = [];
    const allTeams = teams.data.teams.forEach((team) => {
      teamList.push({ label: team.team_name, value: team.team_name });
    });
    return teamList;
  });
}
