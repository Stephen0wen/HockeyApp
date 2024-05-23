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

exports.createLeagueTables = (fixtures) => {
    const teamData = {};

    fixtures.forEach((fixture) => {
        const { division, team_name, scored, conceded } = fixture;

        if (!teamData[division]) {
            teamData[division] = {};
        }

        if (!teamData[division][team_name]) {
            teamData[division][team_name] = {
                points: 0,
                wins: 0,
                draws: 0,
                losses: 0,
                goals_for: 0,
                goals_against: 0,
                goal_difference: 0,
            };
        }

        const teamRow = teamData[division][team_name];

        teamRow.goals_for += scored;
        teamRow.goals_against += conceded;
        teamRow.goal_difference = teamRow.goals_for - teamRow.goals_against;

        if (scored > conceded) {
            teamRow.points += 3;
            teamRow.wins += 1;
        }
        if (scored === conceded) {
            teamRow.points += 1;
            teamRow.draws += 1;
        }
        if (scored < conceded) {
            teamRow.losses += 1;
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
