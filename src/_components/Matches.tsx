import { Match } from '../_types/Match';

const Matches = ({
	matches,
	scoreChangedList,
}: {
	matches: Match[];
	scoreChangedList: number[];
}) => {
	return (
		<div className='w-3/4 m-auto flex flex-col gap-4'>
			{matches.map((match: Match) => {
				return (
					<div className=' bg-slate-800 rounded pb-2' key={match.id}>
						<div className='flex justify-between p-2 bg-black'>
							<div className='flex gap-4'>
								<p>Competition: {match.competition.name}</p>
								<p>Scheduled at: {match.scheduled}</p>
							</div>
							<p>Game time: {match.time}</p>
						</div>
						<div className='flex gap-8 my-4'>
							<div className='flex gap-4 w-full justify-center'>
								<p className='w-2/4 text-right'>{match.home.name}</p>

								<div className=''>
									<p
										className={`min-w-12 text-center ${
											scoreChangedList.includes(match.id)
												? 'text-green-950 text-2xl'
												: ''
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

export default Matches;
