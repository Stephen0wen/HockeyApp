import axios from "axios";
const API_URL = "https://hockeyapp-22bi.onrender.com";

export const getLeagueTables = () => {
    return axios
        .get(`${API_URL}/api/league_tables`)
        .then(({ data: { league_tables } }) => {
            return league_tables;
        });
};

export const getMyFixtures = (team_id) => {
    return axios
        .get(`${API_URL}/api/fixtures`, {
            params: { team_id, match_status: "upcoming" },
        })
        .then(({ data: { fixtures } }) => {
            return fixtures;
        });
};

export const getResults = () => {
    return axios
        .get(`${API_URL}/api/fixtures`, {
            params: { match_status: "completed" },
        })
        .then(({ data: { fixtures } }) => {
            return fixtures;
        });
};

export const getUpcomingFixtures = () => {
    return axios
        .get(`${API_URL}/api/fixtures`, {
            params: { match_status: "upcoming" },
        })
        .then(({ data: { fixtures } }) => {
            return fixtures;
        });
};

export const getTeamSheet = (fixture_id, team_id) => {
    return axios
        .get(`${API_URL}/api/fixtures/${fixture_id}/teamsheet/${team_id}`)
        .then(({ data: { teamsheet } }) => {
            return teamsheet;
        });
};

export const getVenueByFixtureId = (fixture_id) => {
    return axios
        .get(`${API_URL}/api/venues/${fixture_id}/venue`)
        .then(({ data: { venue } }) => {
            return venue;
        });
};

export const getMyResponses = (user_id) => {
    return axios
        .get(`${API_URL}/api/responses/${user_id}`)
        .then(({ data: { responses } }) => {
            return responses;
        });
};

export const putResponse = (request) => {
    return axios
        .put(`${API_URL}/api/responses`, request)
        .then(({ data: { response } }) => {
            return response;
        });
};

export const patchUser = (patchBody, user_id) => {
    return axios
        .patch(`${API_URL}/api/users/${user_id}`, patchBody)
        .then((response) => {
            return response;
        });
};

export const getAllPlayers = () => {
    return axios.get(`${API_URL}/api/users`).then(({ data: { users } }) => {
        return users;
    });
};

export const getAllTeams = () => {
    return axios.get(`${API_URL}/api/teams`).then(({ data: { teams } }) => {
        return teams;
    });
};

export function deleteUserById(user_id) {
    return axios.delete(`${API_URL}/api/users/${user_id}`).then((res) => {
        return;
    });
}

export const patchFixtureById = (fixture_id, request) => {
    return axios
        .patch(`${API_URL}/api/fixtures/${fixture_id}`, request)
        .then(({ data: { fixture } }) => {
            return fixture;
        });
};

export const getFilteredFixtures = (match_status, team_id, division) => {
    return axios
        .get(`${API_URL}/api/fixtures`, {
            params: { match_status, team_id, division },
        })
        .then(({ data: { fixtures } }) => {
            return fixtures;
        });
};
