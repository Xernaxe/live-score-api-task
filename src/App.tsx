import { useEffect, useState } from 'react';
import './App.css';
import { getMatches } from './_actions/matches';
import { Match } from './_types/Match';
import { FilterOptions } from './_types/FilterOptions';
import { useSearchParams } from 'react-router-dom';
import { Filter } from './_components/Filter';
import Matches from './_components/Matches';

function App() {
	const [matches, setMatches] = useState<Match[] | null>(null);
	const [scoreChangedList, setScoreChangedList] = useState<number[]>([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const [filters, setFilters] = useState<FilterOptions[]>();

	const updateMatchesState = async () => {
		const fetchedMatches = await getMatches(searchParams);
		const updatedScoreChangedList: number[] = [];

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
		setMatches(fetchedMatches as Match[]);
		setScoreChangedList(updatedScoreChangedList);
	};

	const updateFiltersState = async () => {
		const fetchedFilters = await getMatches();
		const uniqueCompetitions: FilterOptions[] = [];

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
		setFilters([
			{ name: 'Choose a competition', ids: [] },
			...uniqueCompetitions,
		]);
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
						filterOptions={filters}
						searchParams={searchParams}
						setSearchParams={setSearchParams}
					/>
					<Matches matches={matches} scoreChangedList={scoreChangedList} />
				</>
			) : (
				<div> Loading...</div>
			)}
		</>
	);
}

export default App;
