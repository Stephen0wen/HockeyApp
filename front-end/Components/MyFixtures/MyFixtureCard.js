import MatchdayContainer from "../MatchdayContainer";
import FixtureCard from "../FixtureCard";
import MyFixtureUI from "./MyFixtureUI";

export default function MyFixtureCard({ fixture, children }) {
    return (
        <MatchdayContainer
            date={new Date(fixture.match_date).toLocaleDateString()}
        >
            <FixtureCard fixture={fixture}>
                <MyFixtureUI fixture_id={fixture.fixture_id} />
            </FixtureCard>
            {children}
        </MatchdayContainer>
    );
}
