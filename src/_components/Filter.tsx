import React from 'react';
import { FilterOptions } from '../_types/FilterOptions';

interface FilterProps {
	filterOptions: FilterOptions[] | undefined;
	searchParams: URLSearchParams;
	setSearchParams: (params: URLSearchParams) => void;
}

export const Filter: React.FC<FilterProps> = ({
	filterOptions,
	searchParams,
	setSearchParams,
}) => {
	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newParams = new URLSearchParams(searchParams.toString());
		const competitionId = event.target.value;

		if (competitionId) {
			newParams.set('competition_id', competitionId);
		} else {
			newParams.delete('competition_id');
		}

		setSearchParams(newParams);
	};
	return (
		<select
			value={searchParams.get('competition_id') || ''}
			onChange={handleSelectChange}
		>
			{filterOptions?.map((option) => (
				<option key={option.name} value={option.ids.join(',')}>
					{option.name}
				</option>
			))}
		</select>
	);
};
