import axios from "axios";

export const getTeams = () => {
  return axios
    .get("https://hockeyapp.onrender.com/api/teams")
    .then(({ data: { teams } }) => {
      return teams;
    });
};

export const getFixturesByTeamId = (match_status, team_id) => {
  return axios
    .get("https://hockeyapp.onrender.com/api/fixtures", {
      params: { match_status: match_status, team_id: team_id },
    })
    .then(({ data: { fixtures } }) => {
      return fixtures;
    });
};
