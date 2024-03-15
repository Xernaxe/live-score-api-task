import { IMatchData } from '../_types/IMatchData';

const DataToDisplay = ({
	matches,
	scoreChangedList,
}: {
	matches: IMatchData[];
	scoreChangedList: number[];
}) => {
	return (
		<div className='w-3/4 m-auto flex flex-col gap-4'>
			{matches.map((match: IMatchData) => {
				return (
					<div className=' bg-slate-800 rounded p-2' key={match.id}>
						<div className='flex justify-between'>
							<div className=''>
								<p>{match.competition.name}</p>
								<p>At: {match.scheduled}</p>
							</div>
							<p>{match.time}'</p>
						</div>
						<div className='flex gap-8 '>
							<div className='flex gap-4 w-full justify-center'>
								<p className='w-2/4 text-right'>{match.home.name}</p>

								<div className=''>
									<p
										className={`min-w-12 text-center ${
											scoreChangedList.includes(match.id) ? 'text-red-950' : ''
										}`}
									>
										{match.scores.score}
									</p>
								</div>
								<p className='w-2/4'>{match.away.name}</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default DataToDisplay;
