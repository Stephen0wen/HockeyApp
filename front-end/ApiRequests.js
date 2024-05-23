import axios from "axios";

export const getLeagueTables = () => {
    return axios
        .get("https://hockeyapp.onrender.com/api/league_tables")
        .then(({ data: { league_tables } }) => {
            return league_tables;
        });
};
