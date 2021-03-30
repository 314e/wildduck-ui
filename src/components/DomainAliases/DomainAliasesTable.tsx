/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description DomainAliasesTable Component
 */

import React from 'react';
import { Table } from 'antd';
import { useValues, useActions } from 'kea';
import _ from 'lodash';

import { getDomainAliasesColumns } from './Columns';
import { Pagination } from 'app-ui/utils/Pagination';

import domainAliasesLogic from 'logic/domainAliasesLogic';

import useDomainAliases from 'app-ui/hooks/useDomainAliases';
import useDeleteDomainAliases from 'app-ui/hooks/useDeleteDomainAliases';

/**
 * DomainAliasesTable Component
 */
const DomainAliasesTable: React.FC = () => {
	const { setPage, setLimit, setNext, setPrevious } = useActions(domainAliasesLogic);

	const { query, limit, page, next, previous } = useValues(domainAliasesLogic);

	const { mutate } = useDeleteDomainAliases();

	const { data: results, isLoading } = useDomainAliases({
		query: _.isEmpty(query) ? undefined : query,
		page: page,
		next: page === 1 ? undefined : next || undefined,
		previous: previous || undefined,
		limit: limit,
	});

	const { data, nextCursor, previousCursor } = _.isUndefined(results)
		? { data: [], nextCursor: undefined, previousCursor: undefined }
		: results;
	setNext(nextCursor);
	setPrevious(previousCursor);

	const columns = React.useMemo(
		() =>
			getDomainAliasesColumns({
				dataSource: data,
				deleteDomainAliases: (aliasId: string) => mutate(aliasId),
			}),
		[data],
	);

	return _.isUndefined(data) ? null : (
		<>
			<Pagination
				page={page}
				limit={limit}
				next={next}
				previous={previous}
				setPrevious={setPrevious}
				setLimit={setLimit}
				setNext={setNext}
				setPage={setPage}
			/>
			<Table
				size='small'
				pagination={false}
				bordered={true}
				loading={isLoading}
				columns={columns}
				dataSource={data}
				scroll={{ y: 500 }}
			/>
		</>
	);
};

export default DomainAliasesTable;
