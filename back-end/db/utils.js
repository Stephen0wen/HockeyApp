// const treasures = require("./data/dev-data/treasures");

exports.toNestedArr = (objArr) => {
  return objArr.map((obj) => {
    return Object.values(obj);
  });
};

exports.createLookup = (objArr, lookupKey, lookupValue) => {
  const lookup = {};
  objArr.forEach((obj) => {
    lookup[obj[lookupKey]] = obj[lookupValue];
  });
  return lookup;
};

exports.replaceProperty = (objArr, property, newProperty, lookup) => {
  return objArr.map((obj) => {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      if (key !== property) {
        newObj[key] = obj[key];
      }
    });
    newObj[newProperty] = lookup[obj[property]];
    return newObj;
  });
};

exports.compareMoney = (a, b) => {
  const first = Number(a.slice(1).replace(",", ""));
  const second = Number(b.slice(1).replace(",", ""));

  return first - second;
};

exports.generateLeagueTable = async (db) => {
  const completedMatches = await db.query(
    "SELECT * FROM fixtures WHERE match_status = 'Completed'"
  );

  const teamStats = completedMatches.rows.reduce((stats, match) => {
    const { team1_id, team2_id, team1_score, team2_score } = match;

    const updateTeamStats = async (teamId, score, opponentScore) => {
      const result =
        score > opponentScore
          ? "win"
          : score === opponentScore
          ? "draw"
          : "loss";

      const points =
        score > opponentScore ? 3 : score === opponentScore ? 1 : 0;

      if (!stats[teamId]) {
        const teamName = await db.query(
          "SELECT team_name FROM teams WHERE team_id = $1",
          [teamId]
        );
        stats[teamId] = {
          teamName: teamName.rows[0].team_name,
          gamesPlayed: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
        };
      }

      stats[teamId].gamesPlayed++;
      if (result === "win") {
        stats[teamId].wins++;
      } else if (result === "draw") {
        stats[teamId].draws++;
      } else {
        stats[teamId].losses++;
      }
      stats[teamId].goalsFor += score;
      stats[teamId].goalsAgainst += opponentScore;
      stats[teamId].points += points;
    };

    updateTeamStats(team1_id, team1_score, team2_score);
    updateTeamStats(team2_id, team2_score, team1_score);

    return stats;
  }, {});

  // Sort teams based on points, then goal difference, then goals scored
  const sortedTeams = Object.values(teamStats).sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    }

    const aGoalDifference = a.goalsFor - a.goalsAgainst;
    const bGoalDifference = b.goalsFor - b.goalsAgainst;

    if (aGoalDifference !== bGoalDifference) {
      return bGoalDifference - aGoalDifference;
    }

    return b.goalsFor - a.goalsFor;
  });

  return sortedTeams;
};
