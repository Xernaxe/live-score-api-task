import { useCallback, useEffect, useRef, useState } from 'react';
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
	const [filters, setFilters] =
		useState<FilterOptions[]>();

	const interval = useRef<NodeJS.Timeout>();

	const updateFiltersState = useCallback(async () => {
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
	}, []);

	const updateMatchesState = useCallback(
		async (params: URLSearchParams) => {
			const fetchedMatches = await getMatches(params);
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

			updateFiltersState();
		},
		[matches, updateFiltersState]
	);

	useEffect(() => {
		updateMatchesState(searchParams);
		interval.current = setInterval(() => {
			updateMatchesState(searchParams);
		}, 10000);

		return () => clearTimeout(interval.current);
	}, []);

	return (
		<>
			{matches ? (
				<>
					<Filter
						filterOptions={filters}
						searchParams={searchParams}
						setSearchParams={(value) => {
							if (interval.current) clearInterval(interval.current);
							updateMatchesState(value);
							interval.current = setInterval(() => {
								console.log('update matches state');
								updateMatchesState(value);
							}, 10000);

							setSearchParams(value);
						}}
					/>
					<Matches
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
