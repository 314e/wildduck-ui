/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description Users Table
 */

import React from 'react';
import { Table } from 'antd';
import { useActions, useValues } from 'kea';
import _ from 'lodash';

import { getUsersColumns } from './Columns';
import { Pagination } from 'app-ui/utils/Pagination';

import useUsers from 'app-ui/hooks/useUsers';
import useDeleteUser from 'app-ui/hooks/useDeleteUser';

import usersLogic from 'app-redux/logic/usersLogic';

const UsersTable: React.FC = () => {
	const { setPage, setLimit, setNext, setPrevious } = useActions(usersLogic);
	const { searchParams, limit, page, next, previous } = useValues(usersLogic);

	const { data: results, isLoading } = useUsers({
		query: searchParams?.query,
		tags: searchParams?.tags,
		requiredTags: searchParams?.requiredTags,
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

	const { mutate } = useDeleteUser();

	const columns = React.useMemo(
		() => getUsersColumns({ dataSource: data, deleteUser: (userId: string) => mutate(userId) }),
		[data],
	);

	return (
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
				bordered
				columns={columns}
				dataSource={data}
				pagination={false}
				scroll={{ y: 500, x: 'calc(700px + 50%)' }}
				loading={isLoading}
				style={{ marginTop: '10px' }}
			/>
		</>
	);
};

export default UsersTable;
