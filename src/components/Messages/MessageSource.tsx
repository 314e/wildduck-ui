/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description MessagesSource Component
 */

import React from 'react';
import { Card, Breadcrumb } from 'antd';
import BraftEditor from 'braft-editor';
import { useParams } from 'react-router-dom';
import { useActions, useValues } from 'kea';

import Page from '../Page';

import mailboxesLogic from 'app-redux/logic/mailboxesLogic';
import messagesLogic from 'app-redux/logic/messagesLogic';

import useMessageSource from 'app-ui/hooks/useMessageSource';

const MessageSource: React.FC = () => {
	const { mailboxId, mailboxName } = useValues(mailboxesLogic);
	const { setUpdateMailboxToggle, setShowMailboxMessagesTable } = useActions(mailboxesLogic);

	const { setMessageSourceToggle } = useActions(messagesLogic);
	const { messageId } = useValues(messagesLogic);

	const { id }: any = useParams();

	const { data } = useMessageSource({ userId: id, mailboxId: mailboxId, messageNumber: messageId });

	const pageBreadcrumb = (
		<Breadcrumb>
			<Breadcrumb.Item>
				<a
					onClick={(event) => {
						event.stopPropagation();
						setUpdateMailboxToggle(false);
						setShowMailboxMessagesTable(false);
					}}
				>
					Mailboxes
				</a>
			</Breadcrumb.Item>
			<Breadcrumb.Item>
				<a
					onClick={(event) => {
						event.stopPropagation();
						setMessageSourceToggle(false);
					}}
				>
					{mailboxName}
				</a>
			</Breadcrumb.Item>
			<Breadcrumb.Item>Message Source</Breadcrumb.Item>
		</Breadcrumb>
	);

	return (
		<Page title={pageBreadcrumb}>
			<Card>
				<BraftEditor language='en' controls={[]} value={BraftEditor.createEditorState(data)} readOnly />
			</Card>
		</Page>
	);
};

export default MessageSource;
