/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description SearchAlias Component
 */

import React from 'react';
import { useActions, useValues } from 'kea';

import Search from 'antd/lib/input/Search';

import domainAliasesLogic from 'logic/domainAliasesLogic';

/**
 * SearchAlias Component
 */
const SearchAlias: React.FC = () => {
	const { setQuery } = useActions(domainAliasesLogic);
	const { query } = useValues(domainAliasesLogic);

	const onSearch = (value: string) => {
		setQuery(value);
	};

	return (
		<Search
			size='large'
			placeholder='Enter domain'
			allowClear
			defaultValue={query}
			enterButton='Search'
			onSearch={onSearch}
		/>
	);
};

export default SearchAlias;
