const { createLeagueTables } = require("../db/utils");
const {
    selectHomeFixtures,
    selectAwayFixtures,
} = require("../models/league_tables.model");

exports.getLeagueTables = (request, response, next) => {
    Promise.all([selectHomeFixtures(), selectAwayFixtures()]).then(
        ([homeFixtures, awayFixtures]) => {
            const allFixtures = [...homeFixtures, ...awayFixtures];
            const league_tables = createLeagueTables(allFixtures);
            response.status(200).send({ league_tables });
        }
    );
};
