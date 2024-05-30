import { useEffect, useState } from "react";
import { FAB } from "react-native-paper";

import { getAllTeams, getFixturesByTeamId } from "../../ApiRequests";
import TeamFilter from "./TeamFilter";

export default FilterFixtures = ({ setFixtures, matchStatus }) => {
    const [expanded, setVisible] = useState(false);
    const [filterTeamId, setFilterTeamId] = useState(null);
    const [teams, setTeams] = useState([]);
    const [showTeam, setShowTeam] = useState(false);

    const onStateChange = () => setVisible(!expanded);
    const toggleShowTeam = () => {
        setShowTeam(!showTeam);
        console.log(showTeam);
    };

    useEffect(() => {
        getAllTeams()
            .then((teamsList) => {
                setTeams(teamsList);
            })
            .then(() => {
                getFixturesByTeamId(matchStatus, filterTeamId).then(
                    (filteredFixturesByTeam) => {
                        setFixtures(filteredFixturesByTeam);
                    }
                );
            });
    }, [filterTeamId]);

    const teamsActionsList = teams.map((team, index) => {
        return {
            icon: "plus",
            label: team.team_name,
            onPress: () => {
                setFilterTeamId(team.team_id);
            },
        };
    });

    return (
        <>
            <FAB.Group
                open={expanded}
                icon={"filter"}
                actions={[
                    {
                        icon: "plus",
                        label: "Team",
                        onPress: toggleShowTeam,
                    },
                    {
                        icon: "plus",
                        label: "Division",
                        onPress: toggleShowTeam,
                    },
                ]}
                onStateChange={onStateChange}
            ></FAB.Group>
            <TeamFilter
                teams={teams}
                showTeam={showTeam}
                toggleShowTeam={toggleShowTeam}
                setFilterTeamId={setFilterTeamId}
            />
        </>
    );
};
