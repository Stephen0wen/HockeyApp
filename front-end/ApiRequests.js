import axios from "axios";

export const getLeagueTables = () => {
    return axios
        .get("http://localhost:9090/api/league_tables")
        .then(({ data: { league_tables } }) => {
            return league_tables;
        });
};
