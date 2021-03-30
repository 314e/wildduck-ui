/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description Filters Component
 */

import React from 'react';
import _ from 'lodash';
import { useValues } from 'kea';

import AddFiltersForm from './AddFiltersForm';
import FiltersTable from './FiltersTable';

import filtersLogic from 'app-redux/logic/filtersLogic';

const Filters: React.FC = () => {
	const { showAddFilterForm, filterId } = useValues(filtersLogic);

	return (
		<>
			{showAddFilterForm ? <AddFiltersForm action='create' /> : null}
			{!_.isEmpty(filterId) ? <AddFiltersForm action='update' /> : null}
			{_.isEmpty(filterId) && !showAddFilterForm && <FiltersTable />}
		</>
	);
};

export default Filters;
