import MatchdayContainer from "../MatchdayContainer";
import FixtureCard from "../FixtureCard";
import MyFixtureUI from "./MyFixtureUI";

export default function MyFixtureCard({ fixture, children }) {
    return (
        <MatchdayContainer
            key={fixture.fixture_id}
            date={new Date(fixture.match_date).toLocaleDateString()}
        >
            <FixtureCard fixture={fixture}>
                <MyFixtureUI />
            </FixtureCard>
            {children}
        </MatchdayContainer>
    );
}
