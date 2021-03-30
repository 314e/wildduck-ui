/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description Messages Component
 */

import React from 'react';
import { Breadcrumb } from 'antd';
import { useActions, useValues } from 'kea';

import MailboxMessages from './MailboxMessages';
import { Page } from '../Page/Page';
import MessageSource from './MessageSource';
import MessageDetails from './MessageDetails';

import messagesLogic from 'app-redux/logic/messagesLogic';
import mailboxesLogic from 'app-redux/logic/mailboxesLogic';

/**
 * Messages Component
 */
const Messages: React.FC = () => {
	const { setUpdateMailboxToggle, setShowMailboxMessagesTable } = useActions(mailboxesLogic);
	const { mailboxName } = useValues(mailboxesLogic);
	const { messageSourceToggle, messageDetailsToggle } = useValues(messagesLogic);

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
			<Breadcrumb.Item>{mailboxName}</Breadcrumb.Item>
		</Breadcrumb>
	);

	if (messageDetailsToggle) {
		return <MessageDetails />;
	} else if (messageSourceToggle) {
		return <MessageSource />;
	} else {
		return (
			<Page title={pageBreadcrumb}>
				<MailboxMessages />
			</Page>
		);
	}
	// }
};

export default Messages;
