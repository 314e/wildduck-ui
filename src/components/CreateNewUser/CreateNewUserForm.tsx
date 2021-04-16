/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description Add Users screen
 */

import React from 'react';
import { Form, Button, Input, Switch, Space, Select, Col, Row } from 'antd';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

import { userTooltip } from 'app-ui/lib/constants/constant';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getBasePath } from 'app-ui/components/CustomLink';
import useCreateUser from 'app-ui/hooks/useCreateUser';

const { Option } = Select;

const CreateNewUserForm: React.FC = () => {
	const { mutate, isSuccess, data } = useCreateUser();

	const history = useHistory();

	if (isSuccess && !_.get(data, 'data.error')) {
		history.push(`${getBasePath()}/users`);
	}

	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		const mailboxes = {};
		const metaData = {};

		const userDetails: any = _.reduce(
			values,
			(acc, value, index) => {
				if (!_.isEmpty(value) || value === false || value === true) {
					if (index === 'sent' || index === 'junk' || index === 'drafts' || index === 'trash') {
						_.set(mailboxes, `${index}`, value);
					} else if (index === 'metaData') {
						value.forEach((data: any) => {
							_.set(metaData, `${data.key}`, data.value);
						});
					} else {
						_.set(acc, `${index}`, value);
					}
				}

				return acc;
			},
			{},
		);

		_.set(userDetails, 'mailboxes', mailboxes);
		_.set(userDetails, 'metaData', metaData);

		mutate(userDetails);
	};

	const handleReset = () => {
		form.resetFields();
	};

	return (
		<Form
			form={form}
			name='basic'
			labelCol={{ span: 12 }}
			wrapperCol={{ span: 12 }}
			initialValues={{
				remember: true,
				emptyAddress: false,
				hashedPassword: false,
				allowUnsafe: false,
				requirePasswordChange: false,
				addTagsToAddress: false,
				uploadSentMessages: false,
				encryptMessages: false,
				encryptForwarded: false,
				spamLevel: 50,
				sent: 'Sent Mail',
				junk: 'Junk',
				drafts: 'Draft',
				trash: 'Trash',
			}}
			onFinish={onFinish}
		>
			<Row style={{ paddingTop: 20 }}>
				<Col span={10}>
					<Form.Item
						label='Username'
						name='username'
						rules={[
							{
								required: true,
								message: 'Please input your username!',
							},
						]}
						tooltip={userTooltip.username}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Name'
						name='name'
						rules={[
							{
								required: true,
								message: 'Please input your name!',
							},
						]}
						tooltip={userTooltip.name}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Email address'
						name='address'
						rules={[
							{
								required: false,
								message: 'Please input your address!',
							},
						]}
						tooltip={userTooltip.address}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Password'
						name='password'
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}
					>
						<Input.Password minLength={6} />
					</Form.Item>
					<Form.Item
						label='Empty Address'
						name='emptyAddress'
						tooltip={userTooltip.emptyAddress}
						valuePropName='checked'
					>
						<Switch />
					</Form.Item>
					<Form.Item
						label='Hashed Password'
						name='hashedPassword'
						tooltip={userTooltip.hashedPassword}
						valuePropName='checked'
					>
						<Switch />
					</Form.Item>
					<Form.Item
						label='Required Password Change'
						name='requirePasswordChange'
						tooltip={userTooltip.requirePasswordChange}
						valuePropName='checked'
					>
						<Switch />
					</Form.Item>
					<Form.Item
						label='Allow Unsafe'
						name='allowUnsafe'
						tooltip={userTooltip.allowUnsafe}
						valuePropName='checked'
					>
						<Switch />
					</Form.Item>
					<Form.Item label='Tags' name='tags' tooltip={userTooltip.tags}>
						<Select mode='tags' style={{ width: '100%' }} placeholder='Enter Tags' />
					</Form.Item>
					<Form.Item
						label='Add Tags to Address'
						name='addTagsToAddress'
						tooltip={userTooltip.addTagsToAddress}
						valuePropName='checked'
					>
						<Switch />
					</Form.Item>
					<Form.Item label='Retention' name='retention' tooltip={userTooltip.retention}>
						<Input />
					</Form.Item>
					<Form.Item
						label='Upload sent messages'
						name='uploadSentMessages'
						tooltip={userTooltip.uploadSentMessages}
						valuePropName='checked'
					>
						<Switch />
					</Form.Item>
					<Form.Item label='Public PGP Key' name='pubKey' tooltip={userTooltip.pubKey}>
						<Input />
					</Form.Item>
					<Form.Item
						label='Encrypt Messages'
						name='encryptMessages'
						tooltip={userTooltip.encryptMessages}
						valuePropName='checked'
					>
						<Switch />
					</Form.Item>
					<Form.Item
						label='Encrypt Forwarded'
						name='encryptForwarded'
						tooltip={userTooltip.encryptForwarded}
						valuePropName='checked'
					>
						<Switch />
					</Form.Item>
					<Form.Item label='Meta Data' name='metaData' tooltip={userTooltip.metaData}>
						<Form.List name='metaData'>
							{(fields, { add, remove }) => (
								<>
									{fields.map((field) => (
										<Space
											key={field.key}
											style={{ display: 'flex', marginBottom: 8 }}
											align='baseline'
										>
											<Form.Item
												{...field}
												name={[field.name, 'key']}
												fieldKey={[field.fieldKey, 'key']}
												rules={[{ required: true, message: 'Missing Key' }]}
											>
												<Input placeholder='Key' />
											</Form.Item>
											<Form.Item
												{...field}
												name={[field.name, 'value']}
												fieldKey={[field.fieldKey, 'value']}
												rules={[{ required: true, message: 'Missing Value' }]}
											>
												<Input placeholder='Value' />
											</Form.Item>
											<MinusCircleOutlined onClick={() => remove(field.name)} />
										</Space>
									))}
									<Form.Item>
										<Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
											Add field
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>
					</Form.Item>
					<Form.Item label='Targets' name='targets' tooltip={userTooltip.targets}>
						<Select mode='tags' style={{ width: '100%' }} placeholder='Enter Targets' />
					</Form.Item>
					<Form.Item label='Spam Level' name='spamLevel' tooltip={userTooltip.spamLevel}>
						<Input type={'number'} />
					</Form.Item>
				</Col>
				<Col span={10} offset={1}>
					<Form.Item label='Quota' name='quota' tooltip={userTooltip.quota}>
						<Input type={'number'} />
					</Form.Item>
					<Form.Item label='Recipients' name='recipients' tooltip={userTooltip.recipients}>
						<Input type={'number'} />
					</Form.Item>
					<Form.Item label='Forwards' name='forwards' tooltip={userTooltip.forwards}>
						<Input type={'number'} />
					</Form.Item>
					<Form.Item label='Max Upload for imap ' name='imapMaxUpload' tooltip={userTooltip.imapMaxUpload}>
						<Input type={'number'} />
					</Form.Item>
					<Form.Item
						label='Max Download for imap'
						name='imapMaxDownload'
						tooltip={userTooltip.imapMaxDownload}
					>
						<Input type={'number'} />
					</Form.Item>
					<Form.Item
						label='Max Connections for imap'
						name='imapMaxConnections'
						tooltip={userTooltip.imapMaxConnections}
					>
						<Input type={'number'} />
					</Form.Item>
					<Form.Item label='Max messages from MX' name='receivedMax' tooltip={userTooltip.receivedMax}>
						<Input type={'number'} />
					</Form.Item>
					<Form.Item label='Mailboxes' name='mailboxes' tooltip={userTooltip.mailboxes}>
						<Form.Item label='Sent Mail' name='sent' tooltip={userTooltip.sent}>
							<Input />
						</Form.Item>
						<Form.Item label='Junk' name='junk' tooltip={userTooltip.junk}>
							<Input />
						</Form.Item>
						<Form.Item label='Drafts' name='drafts' tooltip={userTooltip.drafts}>
							<Input />
						</Form.Item>
						<Form.Item label='Trash' name='trash' tooltip={userTooltip.trash}>
							<Input />
						</Form.Item>
					</Form.Item>
					<Form.Item
						label='Disabled Scopes'
						name='disabledScopes'
						rules={[
							{
								required: false,
								message: 'List of scopes that are disabled for this user ("imap", "pop3", "smtp")',
							},
						]}
						tooltip={userTooltip.disabledScopes}
					>
						<Select mode='tags' style={{ width: '100%' }} placeholder='Select Scopes to disable'>
							{_.map(['imap', 'pop3', 'smtp'], (tag) => {
								return (
									<Option key={tag} value={tag}>
										{tag}
									</Option>
								);
							})}
						</Select>
					</Form.Item>
					<Form.Item label='Whitelist' name='fromWhitelist' tooltip={userTooltip.fromWhitelist}>
						<Select mode='tags' style={{ width: '100%' }} placeholder='Enter addresses to whitelist' />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 12 }}>
						<Space size='middle'>
							<Button type='default' htmlType='button' onClick={handleReset}>
								Reset
							</Button>
							<Button type='primary' htmlType='submit'>
								Create
							</Button>
						</Space>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default CreateNewUserForm;
