/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description AuthenticationTable Component
 */

import React from 'react';
import { Table } from 'antd';
import { useActions, useValues } from 'kea';
import _ from 'lodash';
import { useParams } from 'react-router-dom';

import { getAuthenticatonColumns } from './Columns';
import useAuthentication from 'app-ui/hooks/useAuthentication';
import { Pagination } from 'app-ui/utils/Pagination';

import authenticationLogic from 'app-ui/logic/authenticationLogic';

const AuthenticationTable: React.FC = () => {
	const { page, limit, previous, next } = useValues(authenticationLogic);
	const { setLimit, setPage, setNext, setPrevious } = useActions(authenticationLogic);

	const { id }: any = useParams();

	const { data: results, isLoading } = useAuthentication(id, {
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

	const columns = React.useMemo(() => getAuthenticatonColumns({ dataSource: data }), [data]);
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
				loading={isLoading}
				columns={columns}
				dataSource={data}
				pagination={false}
				scroll={{ y: 450 }}
			/>
		</>
	);
};

export default AuthenticationTable;
