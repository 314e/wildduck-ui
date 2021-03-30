/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description CreateNewForwardedAddressForm Component
 */

import React from 'react';
import _ from 'lodash';
import { Form, Input, Button, Switch, Select, DatePicker } from 'antd';
import BraftEditor, { BuiltInControlType } from 'braft-editor';
import { useHistory } from 'react-router-dom';

import { tailLayout, layout } from '../FormLayout';
import { SAddress } from '../../lib/constants/constant';
import { createForwardedAddressFormatter } from 'app-ui/lib/constants/Formatter';
import { getBasePath } from '../CustomLink';

import useCreateForwardedAddress from 'app-ui/hooks/useCreateForwardedAddress';

import 'braft-editor/dist/index.css';
import 'styles/style.css';

const { RangePicker } = DatePicker;

/**
 * CreateNewForwardedAddressForm Component
 */
const CreateNewForwardedAddressForm = (): JSX.Element => {
	const { mutate, isSuccess, data } = useCreateForwardedAddress();

	const history = useHistory();

	if (isSuccess && !_.get(data, 'data.error')) {
		history.push(`${getBasePath()}/forwarded-addresses`);
	}

	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		const details = {
			text: _.get(values, 'text', '').toText(),
			html: _.get(values, 'text', '').toHTML(),
		};
		mutate(createForwardedAddressFormatter(_.assign(values, details)));
	};

	const onReset = () => {
		form.resetFields();
	};

	const excludeControls: BuiltInControlType[] = ['media', 'fullscreen'];

	return (
		<Form
			{...layout}
			name='basic'
			form={form}
			initialValues={{
				remember: true,
				text: BraftEditor.createEditorState(''),
			}}
			onFinish={onFinish}
		>
			<Form.Item
				label='Email address'
				name='address'
				tooltip={_.get(SAddress, 'CreateForwardedAddress.address')}
				rules={[{ required: true, message: 'Please input your address!' }]}
			>
				<Input />
			</Form.Item>
			<Form.Item label='Username' name='name' tooltip={_.get(SAddress, 'CreateForwardedAddress.name')}>
				<Input />
			</Form.Item>
			<Form.Item label='Forwards' name='forwards' tooltip={_.get(SAddress, 'CreateForwardedAddress.forwards')}>
				<Input type='number' min={0} />
			</Form.Item>
			<Form.Item label='Targets' name='targets' tooltip={_.get(SAddress, 'CreateForwardedAddress.targets')}>
				<Select mode='tags' style={{ width: '100%' }} placeholder='Enter Tagets' />
			</Form.Item>
			<Form.Item
				name='allow-wildcards'
				label='Allow Wildcards'
				valuePropName='checked'
				tooltip={_.get(SAddress, 'CreateForwardedAddress.allowWildcard')}
			>
				<Switch />
			</Form.Item>
			<Form.Item label='Tags' name='tags' tooltip={_.get(SAddress, 'CreateForwardedAddress.tags')}>
				<Select mode='tags' style={{ width: '100%' }} placeholder='Enter Tags' />
			</Form.Item>
			<Form.Item label='Autoreply >' name='autoreply'>
				<Form.Item
					name='status'
					label='Status'
					valuePropName='checked'
					tooltip={_.get(SAddress, 'CreateForwardedAddress.autoreply.status')}
				>
					<Switch />
				</Form.Item>
				<Form.Item label='Date' name='date'>
					<RangePicker style={{ width: '160%' }} showTime />
				</Form.Item>
				<Form.Item
					label='Username'
					name='autoreplyName'
					tooltip={_.get(SAddress, 'CreateForwardedAddress.autoreply.name')}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Subject'
					name='subject'
					tooltip={_.get(SAddress, 'CreateForwardedAddress.autoreply.subject')}
				>
					<Input />
				</Form.Item>
				<Form.Item label='Text' name='text' tooltip={_.get(SAddress, 'CreateForwardedAddress.autoreply.text')}>
					<BraftEditor
						language='en'
						className='braftEditorCard'
						placeholder='Enter your content here'
						excludeControls={excludeControls}
					/>
				</Form.Item>
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button htmlType='button' onClick={onReset}>
					Reset
				</Button>
				<Button type='primary' htmlType='submit'>
					Create
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CreateNewForwardedAddressForm;
