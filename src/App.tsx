import { useEffect, useState } from 'react';
import './App.css';
import DataToDisplay from './_components/DataToDisplay';
import { getMatches } from './_data-entry/matches';
import { IMatchData } from './_types/IMatchData';
import { IFilterOptions } from './_types/IFilterOptions';
import { useSearchParams } from 'react-router-dom';
import { Filter } from './_components/Filter';

function App() {
	const [matches, setMatches] = useState<IMatchData[] | null>(null);
	const [scoreChangedList, setScoreChangedList] = useState<number[]>([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const [competitionsFilter, setCompetitionsFilter] =
		useState<IFilterOptions[]>();

	const updateMatchesState = async () => {
		const fetchedMatches = await getMatches(searchParams);
		let updatedScoreChangedList: number[] = [];

		matches?.forEach((match) => {
			const fetchedMatch = fetchedMatches?.find((m) => m.id === match.id);
			if (fetchedMatch && match.scores.score !== fetchedMatch.scores.score) {
				updatedScoreChangedList.push(match.id);
			}
		});
		fetchedMatches?.sort((a, b) => {
			if (a.status === 'FINISHED' && b.status !== 'FINISHED') return 1;
			else if (a.status !== 'FINISHED' && b.status === 'FINISHED') return -1;
			return 0;
		});
		setMatches(fetchedMatches as IMatchData[]);
		setScoreChangedList(updatedScoreChangedList);
	};

	const updateFiltersState = async () => {
		const fetchedFilters = await getMatches();
		const uniqueCompetitions: IFilterOptions[] = [];

		fetchedFilters?.forEach((match) => {
			const { id, name } = match.competition;
			const existingCompetitionIndex = uniqueCompetitions.findIndex(
				(comp) => comp.name === name
			);
			if (existingCompetitionIndex === -1) {
				uniqueCompetitions.push({ name, ids: [id] });
			} else {
				if (!uniqueCompetitions[existingCompetitionIndex].ids.includes(id)) {
					uniqueCompetitions[existingCompetitionIndex].ids.push(id);
				}
			}
		});
		setCompetitionsFilter([
			{ name: 'Choose a competition', ids: [] },
			...uniqueCompetitions,
		]);
		console.log(competitionsFilter);
	};

	useEffect(() => {
		const interval = setTimeout(() => {
			updateMatchesState();
		}, 10000);
		return () => clearTimeout(interval);
	}, [matches]);

	useEffect(() => {
		updateMatchesState();
		updateFiltersState();
	}, [searchParams]);

	return (
		<>
			{matches ? (
				<>
					<Filter
						filterOptions={competitionsFilter}
						searchParams={searchParams}
						setSearchParams={setSearchParams}
					/>
					<DataToDisplay
						matches={matches}
						scoreChangedList={scoreChangedList}
					/>
				</>
			) : (
				<div> Loading...</div>
			)}
		</>
	);
}

export default App;
