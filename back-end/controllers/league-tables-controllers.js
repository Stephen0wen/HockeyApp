exports.getLeagueTables = (request, response, next) => {
  selectLeagueTables()
    .then((league_tables) => {
      response.status(200).send({ league_tables });
    })
    .catch(next);
};
