/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description Mailboxes Component
 */

import React from 'react';
import { useValues } from 'kea';

import Messages from '../Messages';
import MailboxEditForm from './MailboxEditForm';
import MailboxesTable from './MailboxesTable';
import MailboxSearch from './MailboxSearch';

import mailboxesLogic from 'logic/mailboxesLogic';

/**
 * Mailboxes Component
 */
const Mailboxes: React.FC = () => {
	const { updateMailboxToggle, showMailboxMessagesTable } = useValues(mailboxesLogic);

	return updateMailboxToggle ? (
		<MailboxEditForm />
	) : showMailboxMessagesTable ? (
		<Messages />
	) : (
		<>
			<MailboxSearch />
			<MailboxesTable />
		</>
	);
};

export default Mailboxes;
