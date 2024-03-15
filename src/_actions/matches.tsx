import { Match } from '../_types/Match';

const API_KEY = import.meta.env.VITE_LIVE_SCORE_API_KEY || import.meta.env.VITE_VERCEL_LIVE_SCORE_API_KEY;
const API_SECRET = import.meta.env.VITE_LIVE_SCORE_API_SECRET || import.meta.env.VITE_VERCEL_LIVE_SCORE_API_SECRET;
const API_URL = 'http://livescore-api.com/api-client/matches/live.json?';
export const getMatches = async (
	searchParams: URLSearchParams = new URLSearchParams()
) => {
	try {
		const response = await fetch(
			`${API_URL}key=${API_KEY}&secret=${API_SECRET}&${searchParams}`
		);
		const data = await response.json();

		return data.data.match as Match[];
	} catch (error) {
		console.log(error);
		return null;
	}
};
