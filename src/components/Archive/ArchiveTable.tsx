/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description ArchiveTable Component
 */

import React from 'react';
import _ from 'lodash';
import { Table, Tooltip } from 'antd';
import { useActions, useValues } from 'kea';
import { useParams } from 'react-router-dom';

import { getArchiveColumns } from './Columns';
import useRestoreArchiveMessage, { IRestoreArchiveMessage } from 'app-ui/hooks/useRestoreArchiveMessage';
import FloatingButton from '../FloatingButton';
import { RedoOutlined } from '@ant-design/icons';
import { Pagination } from 'app-ui/utils/Pagination';

import useArchive from 'app-ui/hooks/useArchive';

import archiveLogic from 'app-ui/logic/archiveLogic';

/**
 * ArchiveTable Component
 */
const ArchiveTable = () => {
	const { id }: any = useParams();

	const { setPage, setLimit, setNext, setPrevious, setIsModalVisible } = useActions(archiveLogic);
	const { limit, page, next, previous } = useValues(archiveLogic);

	const { mutate } = useRestoreArchiveMessage();

	const { data: results, isLoading } = useArchive({
		userId: id,
		params: {
			page: page,
			next: page === 1 ? undefined : next || undefined,
			previous: previous || undefined,
			limit: limit,
		},
	});

	const { data, nextCursor, previousCursor } = _.isUndefined(results)
		? { data: [], nextCursor: undefined, previousCursor: undefined }
		: results;
	setNext(nextCursor);
	setPrevious(previousCursor);

	const columns = React.useMemo(
		() =>
			getArchiveColumns({
				dataSource: data,
				restoreMessage: ({ message, params }: IRestoreArchiveMessage) =>
					mutate({ userId: id, message: message, params: params }),
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
				loading={isLoading}
				size='small'
				columns={columns}
				dataSource={data}
				scroll={{ x: 1500, y: 450 }}
				pagination={false}
			/>
			<FloatingButton>
				<Tooltip title='Restore All Messages'>
					<RedoOutlined
						onClick={() => {
							setIsModalVisible(true);
						}}
					/>
				</Tooltip>
			</FloatingButton>
		</>
	);
};

export default ArchiveTable;
