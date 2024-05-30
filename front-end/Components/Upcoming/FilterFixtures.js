import { useEffect, useState } from "react";
import { FAB } from "react-native-paper";
import { getTeams, getFixturesByTeamId } from "./getTeamsandFixtures";

export default FilterFixtures = ({
  setFixtures,
  matchStatus,
  filterTeamId,
  setFilterTeamId,
}) => {
  const [state, setState] = useState(false);

  const onStateChange = () => setState(!state);

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams()
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
        open={state}
        visible
        icon={state ? "calendar-today" : "plus"}
        actions={[
          { icon: "plus" },
          ...teamsActionsList,
          {
            icon: "plus",
            label: "All teams",
            onPress: () => setFilterTeamId(""),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (state) {
            // do something if the speed dial is open
          }
        }}
      ></FAB.Group>
    </>
  );
};
