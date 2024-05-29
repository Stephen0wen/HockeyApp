const { createLeagueTables } = require("../db/utils");
const { selectCompletedFixtures } = require("../models/league_tables.model");
const { selectTeams } = require("../models/teams-models");

exports.getLeagueTables = (request, response, next) => {
    Promise.all([selectCompletedFixtures(), selectTeams()]).then(
        ([fixtures, teams]) => {
            const league_tables = createLeagueTables(teams, fixtures);
            response.status(200).send({ league_tables });
        }
    );
};
