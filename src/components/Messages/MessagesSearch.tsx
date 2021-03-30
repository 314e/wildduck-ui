/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description MessagesSearch Component
 */

import React from 'react';
import _ from 'lodash';
import { Button, Form, Switch } from 'antd';
import { useActions } from 'kea';

import messagesLogic from 'app-redux/logic/messagesLogic';

/**
 * MessagesSearch Component
 */
const MessagesSearch: React.FC = () => {
	const { setUnseen } = useActions(messagesLogic);

	const [form] = Form.useForm();

	const onFinish = ({ unseen }: any) => {
		setUnseen(unseen);
	};

	return (
		<Form layout={'inline'} form={form} name='basic' initialValues={{ remember: true }} onFinish={onFinish}>
			<Form.Item
				label='Unseen'
				name='unseen'
				valuePropName='checked'
				tooltip='If true, then returns only unseen messages'
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

export default MessagesSearch;
