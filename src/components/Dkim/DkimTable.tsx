/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description Dkim Table
 */

import React from 'react';
import { Table } from 'antd';
import { useValues, useActions } from 'kea';
import _ from 'lodash';

import { getDkimColumns } from './DkimColumns';
import { Pagination } from 'app-ui/utils/Pagination';

import useDeleteDkim from 'app-ui/hooks/useDeleteDkim';
import useDkim from 'app-ui/hooks/useDkim';

import dkimLogic from 'logic/dkimLogic';

const DkimTable: React.FC = () => {
	const { query, page, limit, next, previous } = useValues(dkimLogic);
	const { setPrevious, setLimit, setNext, setPage } = useActions(dkimLogic);
	const { data: results, isLoading } = useDkim({
		query: query,
		page: page,
		next: page === 1 ? undefined : next || undefined,
		previous: previous || undefined,
		limit: limit,
	});
	const { data, previousCursor, nextCursor } = _.isUndefined(results)
		? { data: [], nextCursor: undefined, previousCursor: undefined }
		: results;

	const { mutate } = useDeleteDkim();

	const columns = React.useMemo(
		() =>
			getDkimColumns({
				dataSource: data,
				deleteDkim: (id: string) => mutate(id),
			}),
		[data],
	);

	return (
		<>
			<Pagination
				page={page}
				limit={limit}
				next={nextCursor}
				previous={previousCursor}
				setPrevious={setPrevious}
				setLimit={setLimit}
				setNext={setNext}
				setPage={setPage}
			/>
			<Table
				size='small'
				bordered={true}
				loading={isLoading}
				columns={columns}
				dataSource={data}
				pagination={false}
			></Table>
		</>
	);
};

export default DkimTable;
