import { useEffect, useState } from 'react';
import './App.css';
import DataToDisplay from './_components/DataToDisplay';
import { getMatches } from './_data-entry/matches';
import { IMatchData } from './_types/IMatchData';

function App() {
	const [matches, setMatches] = useState<IMatchData[] | null>(null);
	const [scoreChangedList, setScoreChangedList] = useState<number[]>([]);

	const updateMatchesState = async () => {
		const fetchedMatches = await getMatches();
		let updatedScoreChangedList: number[] = [];

		if (matches && fetchedMatches) {
			for (const match of matches) {
				const fetchedMatch = fetchedMatches.find((m) => m.id === match.id);

				if (fetchedMatch) {
					if (match.scores.score !== fetchedMatch.scores.score) {
						console.log(
							`in state: ${match.scores.score} in fetch: ${fetchedMatch.scores.score}`
						);
						updatedScoreChangedList.push(...updatedScoreChangedList, match.id);
					}
				}
			}
		}
		setMatches(fetchedMatches);
		setScoreChangedList(updatedScoreChangedList);
		updatedScoreChangedList = [];
		console.log(scoreChangedList);
	};
	useEffect(() => {
		const interval = setInterval(() => {
			updateMatchesState();
		}, 10000);

		updateMatchesState();

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			{matches ? (
				<DataToDisplay matches={matches} scoreChangedList={scoreChangedList} />
			) : (
				<div> Loading...</div>
			)}
		</>
	);
}

export default App;
