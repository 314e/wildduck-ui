/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description MailboxEditForm Component
 */

import React from 'react';
import _ from 'lodash';
import { Button, Form, Switch, Input } from 'antd';
import { useActions, useValues } from 'kea';
import { useParams } from 'react-router-dom';

import mailboxesLogic from 'app-ui/logic/mailboxesLogic';
import { layout, tailLayout } from '../FormLayout';
import useUpdateMailbox from 'app-ui/hooks/useUpdateMailbox';

/**
 * MailboxEditForm Component
 */

const MailboxEditForm = () => {
	const { id }: any = useParams();
	const { mutate } = useUpdateMailbox();
	const { setUpdateMailboxToggle } = useActions(mailboxesLogic);
	const { selectedMailboxData } = useValues(mailboxesLogic);

	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		mutate({
			userId: id,
			mailboxId: _.get(selectedMailboxData, 'mailboxId'),
			params: {
				path: _.get(values, 'path'),
				subscribed: _.get(values, 'subscribed'),
				hidden: _.get(values, 'hidden'),
				retention: _.get(values, 'retention'),
			},
		});
		setUpdateMailboxToggle(false);
	};

	const onReset = () => form.resetFields();

	return (
		<Form
			{...layout}
			form={form}
			name='basic'
			initialValues={{ remember: true, ...selectedMailboxData }}
			onFinish={onFinish}
		>
			<Form.Item
				label='Path'
				name='path'
				tooltip='Full path of the mailbox, use this to rename an existing Mailbox'
			>
				<Input />
			</Form.Item>
			<Form.Item
				label='Subscribed'
				name='subscribed'
				valuePropName='checked'
				tooltip='Change Mailbox subscription state'
			>
				<Switch />
			</Form.Item>
			<Form.Item
				label='Hidden'
				name='hidden'
				valuePropName='checked'
				tooltip='Is the folder hidden or not. Hidden folders can not be opened in IMAP.'
			>
				<Switch />
			</Form.Item>
			<Form.Item
				label='Retention'
				name='retention'
				tooltip='Retention policy for the Mailbox. Changing retention value only
				affects messages added to this folder after the change'
			>
				<Input type='number' min={0} />
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button onClick={onReset}>Reset</Button>
				<Button type='primary' htmlType='submit'>
					Udpate
				</Button>
			</Form.Item>
		</Form>
	);
};

export default MailboxEditForm;
