export type TypeCompetition = {
	has_groups: boolean;
	name: string;
	tier: number;
	national_teams_only: boolean;
	is_cup: boolean;
	id: number;
	is_league: boolean;
	active: boolean;
}

export type TypeTeam = {
	name: string;
	country_id: number | null;
	id: number;
	stadium: string;
}

export type TypeScores = {
	score: string;
	ht_score: string;
	ft_score: string;
	et_score: string;
	ps_score: string;
}

export type Match = {
	scheduled: string;
	competition: TypeCompetition;
	time: string;
	last_changed: string;
	fixture_id: number;
	status: string;
	home: TypeTeam;
	added: string;
	id: number;
	country: string | null;
	location: string;
	away: TypeTeam;
	federation: {
		name: string;
		id: number;
	};
	scores: TypeScores;
}
