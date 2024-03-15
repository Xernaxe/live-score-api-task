import { Match } from '../_types/Match';
import { MatchItem } from './MatchItem';

const Matches = ({
	matches,
	scoreChangedList,
}: {
	matches: Match[];
	scoreChangedList: number[];
}) => {
	return (
		<div className='w-full max-w-[40rem] m-auto p-2 flex flex-col gap-4'>
			{matches.map((match: Match) => {
				return (
					<MatchItem
						key={match.id}
						{...match}
						scoreChangedList={scoreChangedList}
					/>
				);
			})}
		</div>
	);
};

export default Matches;
