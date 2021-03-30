/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description Messages Display
 */

import React from 'react';
import { List } from 'antd';
import _ from 'lodash';
import { useActions, useValues } from 'kea';
import { useParams } from 'react-router-dom';

import MessageList from './MessagesList';
import MessagesSearch from './MessagesSearch';
import { Pagination } from 'app-ui/utils/Pagination';

import useMessages from 'app-ui/hooks/useMessages';

import mailboxesLogic from 'app-redux/logic/mailboxesLogic';
import messagesLogic from 'app-redux/logic/messagesLogic';

const MailboxMessages: React.FC = () => {
	const { limit, next, previous, page, unseen } = useValues(messagesLogic);
	const { setLimit, setNext, setPrevious, setPage } = useActions(messagesLogic);

	const { mailboxId } = useValues(mailboxesLogic);

	const { id }: any = useParams();

	const { data: results, isLoading } = useMessages({
		userId: id,
		mailboxId: mailboxId,
		params: {
			unseen: unseen,
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

	return (
		<>
			<MessagesSearch />
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
			<List
				itemLayout='horizontal'
				dataSource={data}
				bordered={true}
				loading={isLoading}
				style={{ height: '500px', overflow: 'scroll', paddingTop: '5px' }}
				renderItem={(item) => <MessageList item={item as any} />}
			/>
		</>
	);
};

export default MailboxMessages;
