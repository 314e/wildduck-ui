/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description Messages List Component
 */

import React from 'react';
import { List } from 'antd';
import moment from 'moment';
import { useActions } from 'kea';

import { GetMessagesResult } from 'app-redux/client/wildduck-api';
import { DATE_TIME_FORMAT_AP } from 'app-ui/utils/constants';
import MessageActions from './MessageActions';

import messagesLogic from 'app-ui/logic/messagesLogic';

const MessageList: React.FC<{ item: GetMessagesResult }> = ({ item }: { item: GetMessagesResult }) => {
	const { setMessageId, setMessageDetailsToggle } = useActions(messagesLogic);
	return (
		<List.Item extra={<MessageActions messageDetails={item} />}>
			<List.Item.Meta
				title={
					<a
						onClick={() => {
							setMessageId(item.id);
							setMessageDetailsToggle(true);
						}}
					>
						{`${item.from.name}<${item.from.address}>  ${moment(item.date).format(DATE_TIME_FORMAT_AP)}`}
					</a>
				}
				description={`${item.subject} - ${item.intro}`}
			/>
		</List.Item>
	);
};

export default MessageList;
