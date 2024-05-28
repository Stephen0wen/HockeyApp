import axios from "axios";

export const getLeagueTables = () => {
    return axios
        .get("https://hockeyapp.onrender.com/api/league_tables")
        .then(({ data: { league_tables } }) => {
            return league_tables;
        });
};

export const getMyFixtures = (team_id) => {
    return axios
        .get("https://hockeyapp.onrender.com/api/fixtures", {
            params: { team_id, match_status: "upcoming" },
        })
        .then(({ data: { fixtures } }) => {
            return fixtures;
        });
};

export const getResults = () => {
    return axios
        .get("https://hockeyapp.onrender.com/api/fixtures", {
            params: { match_status: "completed" },
        })
        .then(({ data: { fixtures } }) => {
            return fixtures;
        });
};

export const getUpcomingFixtures = () => {
    return axios
        .get("https://hockeyapp.onrender.com/api/fixtures", {
            params: { match_status: "upcoming" },
        })
        .then(({ data: { fixtures } }) => {
            return fixtures;
        });
};

export const getTeamSheet = (fixture_id, team_id) => {
    return axios
        .get(
            `https://hockeyapp.onrender.com/api/fixtures/${fixture_id}/teamsheet/${team_id}`
        )
        .then(({ data: { teamsheet } }) => {
            return teamsheet;
        });
};

export const getMyResponses = (user_id) => {
    return axios
        .get(`https://hockeyapp.onrender.com/api/responses/${user_id}`)
        .then(({ data: { responses } }) => {
            return responses;
        });
};

export const putResponse = (request) => {
    return axios
        .put("https://hockeyapp.onrender.com/api/responses", request)
        .then(({ data: { response } }) => {
            return response;
        });
};
