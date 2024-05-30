import { useEffect, useState } from "react";
import { FAB } from "react-native-paper";

import { getAllTeams, getFilteredFixtures } from "../../ApiRequests";
import TeamFilter from "./TeamFilter";
import DivisionFilter from "./DivisionFilter";

export default FilterFixtures = ({ setFixtures, matchStatus }) => {
    const [expanded, setVisible] = useState(false);
    const [filterTeamId, setFilterTeamId] = useState(null);
    const [filterDivision, setFilterDivision] = useState(null);
    const [teams, setTeams] = useState([]);
    const [showTeam, setShowTeam] = useState(false);
    const [showDivision, setShowDivision] = useState(false);

    const onStateChange = () => setVisible(!expanded);
    const toggleShowTeam = () => {
        setShowTeam(!showTeam);
    };
    const toggleShowDivision = () => {
        setShowDivision(!showDivision);
    };

    useEffect(() => {
        getAllTeams()
            .then((teamsList) => {
                setTeams(teamsList);
            })
            .then(() => {
                getFilteredFixtures(
                    matchStatus,
                    filterTeamId,
                    filterDivision
                ).then((filteredFixturesByTeam) => {
                    setFixtures(filteredFixturesByTeam);
                });
            });
    }, [filterTeamId, filterDivision]);

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
                        onPress: toggleShowDivision,
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
            <DivisionFilter
                teams={teams}
                showDivision={showDivision}
                toggleShowDivision={toggleShowDivision}
                setFilterDivision={setFilterDivision}
            />
        </>
    );
};
