interface ICompetition {
	has_groups: boolean;
	name: string;
	tier: number;
	national_teams_only: boolean;
	is_cup: boolean;
	id: number;
	is_league: boolean;
	active: boolean;
}

interface ITeam {
	name: string;
	country_id: number | null;
	id: number;
	stadium: string;
}

interface IScores {
	score: string;
	ht_score: string;
	ft_score: string;
	et_score: string;
	ps_score: string;
}

export interface IMatchData {
	scheduled: string;
	competition: ICompetition;
	time: string;
	last_changed: string;
	fixture_id: number;
	status: string;
	home: ITeam;
	added: string;
	id: number;
	country: string | null;
	location: string;
	away: ITeam;
	federation: {
		name: string;
		id: number;
	};
	scores: IScores;
}
