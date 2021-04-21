/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description MailboxesTable Component
 */

import React from 'react';
import _ from 'lodash';
import { Table } from 'antd';
import { useActions, useValues } from 'kea';
import { useParams } from 'react-router-dom';

import { getMailboxesColumns } from './Columns';
import useDeleteMessagesInMailbox from 'app-ui/hooks/useDeleteMessagesInMailbox';

import useMailboxes from 'app-ui/hooks/useMailboxes';

import messagesLogic from 'app-ui/logic/messagesLogic';
import mailboxesLogic from 'app-ui/logic/mailboxesLogic';

/**
 * MailboxesTable Component
 */
const MailboxesTable: React.FC = () => {
	const { id }: any = useParams();

	const { specialUse } = useValues(mailboxesLogic);

	const { data, isLoading } = useMailboxes({ userId: id, params: { specialUse: specialUse } });

	const {
		setMailboxName,
		setShowMailboxMessagesTable,
		setMailboxId,
		setUpdateMailboxToggle,
		setSelectedMailboxData,
	} = useActions(mailboxesLogic);

	const { setMessageDetailsToggle, setMessageSourceToggle, setMessageId, setAttachmentId } = useActions(
		messagesLogic,
	);

	const { mutate } = useDeleteMessagesInMailbox();

	const columns = React.useMemo(
		() =>
			getMailboxesColumns({
				dataSource: data,
				drilldown: (record: any) => {
					setShowMailboxMessagesTable(true);
					setMailboxId(record.id);
					setMailboxName(record.name);
					setMessageDetailsToggle(false);
					setMessageSourceToggle(false);
					setMessageId('');
					setAttachmentId('');
				},
				edit: (record: any) => {
					setUpdateMailboxToggle(true);
					setSelectedMailboxData({
						mailboxId: _.get(record, 'id'),
						path: _.get(record, 'path'),
						subscribed: _.get(record, 'subscribed'),
						hidden: !_.get(record, 'hidden'),
						retention: _.get(record, 'retention', 0),
					});
				},
				deleteAllMessages: (mailboxId: string) => mutate({ userId: id, mailboxId: mailboxId }),
			}),
		[data],
	);

	return (
		<Table
			size='small'
			bordered={true}
			columns={columns}
			dataSource={data}
			loading={isLoading}
			pagination={_.size(data) > 10 ? null : false}
		/>
	);
};

export default MailboxesTable;
