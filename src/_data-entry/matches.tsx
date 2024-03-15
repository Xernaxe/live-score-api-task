import { IMatchData } from '../_types/IMatchData';
export type MatchType = {};

const URL = 'http://livescore-api.com/api-client/matches/live.json?';
export const getMatches = async (searchParams: URLSearchParams = new URLSearchParams()) => {
	try {
		const response = await fetch(
			`${URL}key=${import.meta.env.VITE_LIVE_SCORE_API_KEY}&secret=${
				import.meta.env.VITE_LIVE_SCORE_API_SECRET
			}&${searchParams}`
		);
		const data = await response.json();

		return data.data.match as IMatchData[];
	} catch (error) {
		console.log(error);
		return null;
	}
};
