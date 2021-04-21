/**
 * @author Aditya <aditya.negi@314ecorp.com>
 * @description Messages Actions Component
 */

import React from 'react';
import { Space, Tooltip, Button } from 'antd';
import { useActions } from 'kea';
import { useParams } from 'react-router-dom';

import { GetMessagesResult } from 'app-redux/client/wildduck-api';
import { MailOutlined, DeleteFilled } from '@ant-design/icons';
import showConfirm from 'app-ui/utils/showConfirm';

import useDeleteMessage from 'app-ui/hooks/useDeleteMessage';

import messagesLogic from 'app-ui/logic/messagesLogic';

const MessageActions: React.FC<{ messageDetails: GetMessagesResult }> = ({
	messageDetails,
}: {
	messageDetails: GetMessagesResult;
}) => {
	const { id }: any = useParams();
	const { mutate } = useDeleteMessage();
	const { setMessageId, setMessageSourceToggle } = useActions(messagesLogic);

	return (
		<Space size={'middle'}>
			<Tooltip title={'Get Message source'}>
				<Button
					className='ant-btn-icon'
					shape='circle'
					onClick={() => {
						setMessageId(messageDetails.id);
						setMessageSourceToggle(true);
					}}
				>
					<MailOutlined className={'blue-color'} />
				</Button>
			</Tooltip>
			<Tooltip title={'Delete'}>
				<Button
					className='ant-btn-icon'
					shape='circle'
					onClick={() =>
						showConfirm(() =>
							mutate({ userId: id, mailboxId: messageDetails.mailbox, messageNumber: messageDetails.id }),
						)
					}
				>
					<DeleteFilled className='red-color' />
				</Button>
			</Tooltip>
		</Space>
	);
};

export default MessageActions;
