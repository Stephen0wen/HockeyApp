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

exports.createLeagueTables = (teams, fixtures) => {
    const teamData = {};

    teams.forEach((team) => {
        const { team_division, team_name } = team;

        if (!teamData[team_division]) {
            teamData[team_division] = {};
        }

        teamData[team_division][team_name] = {
            points: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goals_for: 0,
            goals_against: 0,
            goal_difference: 0,
        };
    });

    fixtures.forEach((fixture) => {
        const { team1_name, team1_score, team2_name, team2_score, division } =
            fixture;

        const teamRow1 = teamData[division][team1_name];
        const teamRow2 = teamData[division][team2_name];

        teamRow1.goals_for += team1_score;
        teamRow1.goals_against += team2_score;
        teamRow1.goal_difference = teamRow1.goals_for - teamRow1.goals_against;

        teamRow2.goals_for += team2_score;
        teamRow2.goals_against += team1_score;
        teamRow2.goal_difference = teamRow2.goals_for - teamRow2.goals_against;

        if (team1_score > team2_score) {
            teamRow1.points += 3;
            teamRow1.wins += 1;
            teamRow2.losses += 1;
        }
        if (team1_score === team2_score) {
            teamRow1.points += 1;
            teamRow1.draws += 1;
            teamRow2.points += 1;
            teamRow2.draws += 1;
        }
        if (team1_score < team2_score) {
            teamRow1.losses += 1;
            teamRow2.points += 3;
            teamRow2.wins += 1;
        }
    });

    const leagueTables = {};
    for (divisionName in teamData) {
        const division = teamData[divisionName];
        const divisionTable = [];
        leagueTables[divisionName] = divisionTable;

        for (teamName in division) {
            const team = division[teamName];
            divisionTable.push({
                team_name: teamName,
                ...team,
            });
        }

        leagueTables[divisionName].sort(divisionSort);
    }

    return leagueTables;

    function divisionSort(a, b) {
        return createSortValue(b) - createSortValue(a);
    }

    function createSortValue(teamRow) {
        let { points, goal_difference, goals_for } = teamRow;

        const pointStr = String(points);

        goal_difference += 500;

        let goalDifStr = String(goal_difference);
        while (goalDifStr.length < 4) {
            goalDifStr = "0" + goalDifStr;
        }

        let goalsForStr = String(goals_for);
        while (goalsForStr.length < 4) {
            goalsForStr = "0" + goalsForStr;
        }

        const sortStr = pointStr + goalDifStr + goalsForStr;

        return Number(sortStr);
    }
};
