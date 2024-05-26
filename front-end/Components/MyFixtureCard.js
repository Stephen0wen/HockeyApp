import MatchdayContainer from "./MatchdayContainer";
import FixtureCard from "./FixtureCard";
import MyFixtureUI from "./MyFixtureUI";
import { Button } from "react-native-paper";

export default function MyFixtureCard({ fixture }) {
    return (
        <MatchdayContainer
            key={fixture.fixture_id}
            date={new Date(fixture.match_date).toLocaleDateString()}
        >
            <FixtureCard fixture={fixture}>
                <MyFixtureUI />
            </FixtureCard>
            <Button>View Team Sheet</Button>
        </MatchdayContainer>
    );
}
