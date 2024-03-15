import { TypeCompetition, TypeScores, TypeTeam } from '../_types/Match';
import { twMerge } from 'tailwind-merge';

export const MatchItem = ({
	id,
	competition: { name: competitionName },
	scheduled,
	time,
	home: { name: homeName },
	away: { name: awayName },
	scores: { score },
	scoreChangedList,
}: {
	id: number;
	competition: TypeCompetition;
	scheduled: string;
	time: string;
	home: TypeTeam;
	away: TypeTeam;
	scores: TypeScores;
	scoreChangedList: number[];
}) => {
	return (
		<div className=' bg-slate-800 rounded pb-2' key={id}>
			<div className='flex justify-between p-2 bg-black'>
				<div className='flex gap-4'>
					<p>Competition: {competitionName}</p>
					<p>Scheduled at: {scheduled}</p>
				</div>
				<p>Game time: {time}</p>
			</div>
			<div className='flex gap-8 my-4'>
				<div className='flex gap-4 w-full justify-center'>
					<p className='w-2/4 text-right'>{homeName}</p>

					<div className=''>
						<p
							className={twMerge(
								'min-w-16 text-center',
								scoreChangedList.includes(id)
									? twMerge('text-green-950 text-2xl')
									: ''
							)}
						>
							{score}
						</p>
					</div>
					<p className='w-2/4'>{awayName}</p>
				</div>
			</div>
		</div>
	);
};
