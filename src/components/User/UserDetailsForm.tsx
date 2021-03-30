/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description User Details Form
 */

import React from 'react';
import { Button, Form, Input, Switch, Space, Select, Row, Col } from 'antd';
import _ from 'lodash';

import { tailLayout } from 'app-ui/components/FormLayout';
import { userTooltip } from 'app-ui/lib/constants/constant';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import useUpdateUserDetails from 'app-ui/hooks/useUpdateUserDetails';

const { Option } = Select;

const UserDetailsForm: React.FC<any> = (props: any) => {
	const { data } = props;

	const [form] = Form.useForm();

	const { mutate } = useUpdateUserDetails();

	const onFinish = (values: any) => {
		const metaData = {};
		const details: any = _.reduce(
			values,
			(acc, value, index) => {
				if (!_.isUndefined(value) || value === false || value === true) {
					if (index === 'metaData') {
						value.forEach((eachMetaData: any) => {
							_.set(metaData, `${eachMetaData.key}`, eachMetaData.value);
						});
					} else if (
						index === 'quota' ||
						index === 'imapDownload' ||
						index === 'pop3Download' ||
						index === 'imapUpload'
					) {
						_.set(acc, `${index}`, value * 1024000);
					} else {
						_.set(acc, `${index}`, value);
					}
				}
				return acc;
			},
			{},
		);

		_.set(details, 'metaData', metaData);

		mutate({
			userId: _.get(data, 'id'),
			userDetails: details,
		});
	};

	const handleReset = () => {
		form.resetFields();
	};

	return _.isUndefined(data) ? null : (
		<Form
			form={form}
			name='basic'
			initialValues={{
				remember: true,
				...data,
				allowUnsafe: false,
				hashedPassword: false,
				uploadSentMessages: false,
				disable2fa: false,
				retention: _.get(data, 'retention', false) || 0,
				quota: _.round(_.get(data, 'limits.quota.allowed', 0) / 1024000, 2),
				recipients: _.get(data, 'limits.recipients.allowed', 0),
				forwards: _.get(data, 'limits.forwards.allowed', 0),
				receivedMax: _.get(data, 'limits.received.allowed', 0),
				imapMaxDownload: _.round(_.get(data, 'limits.imapDownload.allowed', 0) / 1024000, 2),
				imapMaxConnections: _.get(data, 'limits.imapMaxConnections.allowed', 0),
				imapMaxUpload: _.round(_.get(data, 'limits.imapUpload.allowed', 0) / 1024000, 2),
				metaData: _.map(_.get(data, 'metaData', {}), (value, key) => {
					return { key: key, value: value };
				}),
			}}
			onFinish={onFinish}
		>
			<Row style={{ paddingTop: 20 }}>
				<Col span={8} offset={1}>
					<Form.Item label='Name' name='name' tooltip={userTooltip.name}>
						<Input />
					</Form.Item>
					<Form.Item label='Password' name='password'>
						<Input.Password />
					</Form.Item>
					<Form.Item
						label='Hash the Password'
						name='hashedPassword'
						tooltip={userTooltip.hashedPassword}
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
					<Form.Item label='Retention' name='retention' tooltip={userTooltip.retention}>
						<Input type='number' min={0} />
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
					<Form.Item label='Meta Data' tooltip={userTooltip.metaData}>
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
						<Select mode='tags' style={{ width: '100%' }} placeholder='Enter  Targets' />
					</Form.Item>
					<Form.Item label='Spam Level' name='spamLevel' tooltip={userTooltip.spamLevel}>
						<Input type={'number'} max={100} min={0} />
					</Form.Item>
					<Form.Item label='Quota' name='quota' tooltip={userTooltip.quota}>
						<Input type={'number'} addonAfter='MB' />
					</Form.Item>
					<Form.Item label='Max Recipients / Day' name='recipients' tooltip={userTooltip.recipients}>
						<Input type={'number'} />
					</Form.Item>
				</Col>
				<Col span={8} offset={3}>
					<Form.Item label='Current Forwards / Day' name='forwards' tooltip={userTooltip.forwards}>
						<Input type={'number'} />
					</Form.Item>
					<Form.Item
						label='Current Max Upload for imap '
						name='imapMaxUpload'
						tooltip={userTooltip.imapMaxUpload}
					>
						<Input type={'number'} addonAfter='MB' />
					</Form.Item>
					<Form.Item
						label='Current Max Download for imap '
						name='imapMaxDownload'
						tooltip={userTooltip.imapMaxDownload}
					>
						<Input type={'number'} addonAfter='MB' />
					</Form.Item>
					<Form.Item
						label='Current Max Connections for imap'
						name='imapMaxConnections'
						tooltip={userTooltip.imapMaxConnections}
					>
						<Input type={'number'} />
					</Form.Item>
					<Form.Item
						label='Current Max messages from MX'
						name='receivedMax'
						tooltip={userTooltip.receivedMax}
					>
						<Input type={'number'} />
					</Form.Item>
					<Form.Item label='Disabled Scope' name='disabledScopes' tooltip={userTooltip.disabledScopes}>
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
					<Form.Item
						label='Disable User'
						name='disabled'
						tooltip={userTooltip.disabled}
						valuePropName='checked'
					>
						<Switch />
					</Form.Item>
					<Form.Item label='Whitelist' name='fromWhitelist' tooltip={userTooltip.fromWhitelist}>
						<Select mode='tags' style={{ width: '100%' }} placeholder='Enter Whitelist' />
					</Form.Item>
					<Form.Item label='Suspend' name='suspended' tooltip={userTooltip.suspended} valuePropName='checked'>
						<Switch />
					</Form.Item>
					<Form.Item {...tailLayout} style={{ paddingTop: 10 }}>
						<Space size='middle'>
							<Button type='primary' htmlType='submit'>
								Save
							</Button>
							<Button type='default' htmlType='button' onClick={handleReset}>
								Reset
							</Button>
						</Space>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default UserDetailsForm;
