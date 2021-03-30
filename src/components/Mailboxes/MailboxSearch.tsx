/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description MailboxSearch Component
 */

import React from 'react';

import { Button, Form, Switch } from 'antd';
import { useActions } from 'kea';

import mailboxesLogic from 'logic/mailboxesLogic';

/**
 * MailboxSearch Component
 */
const MailboxSearch = () => {
	const { setSpecialUse } = useActions(mailboxesLogic);

	const [form] = Form.useForm();

	const onFinish = ({ specialUse }: any) => {
		setSpecialUse(specialUse);
	};

	return (
		<Form
			layout={'inline'}
			form={form}
			name='basic'
			size='small'
			initialValues={{ remember: true }}
			onFinish={onFinish}
		>
			<Form.Item
				label='Special use'
				name='specialUse'
				valuePropName='checked'
				tooltip='Should the response include only folders with specialUse flag set.'
			>
				<Switch />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Search
				</Button>
			</Form.Item>
		</Form>
	);
};

export default MailboxSearch;
