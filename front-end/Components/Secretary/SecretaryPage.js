import { ScrollView, StyleSheet, View } from "react-native";
import FixtureCard from "../FixtureCard";
import MatchdayContainer from "../MatchdayContainer";
import LoadScreen from "../LoadScreen";
import { useState, useEffect } from "react";
import { getUpcomingFixtures, patchFixtureById } from "../../ApiRequests";
import { Text, Button, TextInput } from "react-native-paper";

export default function SecretaryPage({ handleSubmitScores }) {
  const [upcomingFixtures, setUpcomingFixtures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [homeTeamScore, setHomeTeamScore] = useState("0");
  const [awayTeamScore, setAwayTeamScore] = useState("0");
  const [selectedFixture, setSelectedFixture] = useState(null);
  const [updatedFixture, setUpdatedFixture] = useState(null);

  const styles = StyleSheet.create({
    scroll: {
      flex: 1,
      alignItems: "center",
    },
    title: {
      textAlign: "center",
      margin: 5,
    },
    button: {
      margin: -5,
    },
    text: {
      textAlign: "center",
      marginVertical: 10,
    },
  });

  useEffect(() => {
    setIsLoading(true);
    getUpcomingFixtures()
      .then((apiUpcomingFixtures) => {
        setUpcomingFixtures(apiUpcomingFixtures);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [updatedFixture]);

  if (isLoading) {
    return <LoadScreen message="Loading Upcoming Fixtures..." />;
  }

  const matchDates = [];
  upcomingFixtures.forEach((upcomingFixture) => {
    if (!matchDates.includes(upcomingFixture.match_date)) {
      matchDates.push(upcomingFixture.match_date);
    }
  });

  const handleFixturePress = (fixture) => {
    setSelectedFixture(fixture);
    setHomeTeamScore("");
    setAwayTeamScore("");
  };

  const handleSubmitScoresForFixture = (fixture, homeScore, awayScore) => {
    setUpdatedFixture(fixture.fixture_id);

    console.log("Updated Fixture:", updatedFixture);
    patchFixtureById(fixture.fixture_id, {
      match_status: "completed",
      team1_score: homeScore,
      team2_score: awayScore,
    });
  };

  const matchdayContainers = matchDates.map((matchDate) => {
    const filteredFixtures = upcomingFixtures.filter((upcomingFixture) => {
      return upcomingFixture.match_date === matchDate;
    });

    return (
      <MatchdayContainer
        key={matchDate}
        date={new Date(matchDate).toLocaleDateString()}
      >
        {filteredFixtures.map((filteredFixture) => (
          <FixtureCard
            key={filteredFixture.fixture_id}
            fixture={filteredFixture}
          >
            <Button
              style={styles.button}
              onPress={() => handleFixturePress(filteredFixture)}
            >
              Add result
            </Button>
            {selectedFixture &&
              selectedFixture.fixture_id === filteredFixture.fixture_id && (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TextInput
                      label="Home Score"
                      placeholder="Home Score"
                      value={homeTeamScore}
                      onChangeText={setHomeTeamScore}
                      keyboardType="numeric"
                    />
                    <TextInput
                      label="Away Score"
                      placeholder="Away Score"
                      value={awayTeamScore}
                      onChangeText={setAwayTeamScore}
                      keyboardType="numeric"
                    />
                  </View>
                  <Button
                    style={styles.button}
                    onPress={() =>
                      handleSubmitScoresForFixture(
                        selectedFixture,
                        homeTeamScore,
                        awayTeamScore
                      )
                    }
                  >
                    Submit Scores
                  </Button>
                </View>
              )}
          </FixtureCard>
        ))}
      </MatchdayContainer>
    );
  });

  return (
    <>
      <Text variant="headlineMedium" style={styles.title}>
        Upcoming Fixtures
      </Text>
      <ScrollView contentStyle={styles.scroll}>{matchdayContainers}</ScrollView>
    </>
  );
}
