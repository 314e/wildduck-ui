/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description AutorepliesForm Component
 */

import React, { useEffect } from 'react';
import _ from 'lodash';
import { Form, Input, Button, Switch, DatePicker } from 'antd';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import BraftEditor, { BuiltInControlType } from 'braft-editor';

import { tailLayout, layout } from '../FormLayout';
import { updateAutorepliesFormatter } from 'app-ui/lib/constants/Formatter';

import useUpdateAutoreply from 'app-ui/hooks/useUpdateAutoreply';

import 'braft-editor/dist/index.css';
import 'styles/style.css';

const { RangePicker } = DatePicker;

/**
 * AutorepliesForm Component
 */
const AutorepliesForm: React.FC<any> = (props: any) => {
	const { id }: any = useParams();
	const { data } = props;

	const { mutate: updateAutoreply } = useUpdateAutoreply();

	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		const details = {
			text: _.get(values, 'text', '').toText(),
			html: _.get(values, 'text', '').toHTML(),
		};

		updateAutoreply({ userId: id, updateAutoreply: updateAutorepliesFormatter(_.assign(values, details)) });
	};

	const onReset = () => {
		form.resetFields();
	};

	const excludeControls: BuiltInControlType[] = ['media', 'fullscreen'];

	useEffect(() => {
		form.setFieldsValue({
			...data,
			text: BraftEditor.createEditorState(''),
			date: _.isEmpty(_.get(data, 'start', '')) ? '' : [moment(_.get(data, 'start')), moment(_.get(data, 'end'))],
		});
	}, [data]);

	return _.isEmpty(data) ? null : (
		<Form {...layout} form={form} name='basic' onFinish={onFinish}>
			<Form.Item label='Name' name='name'>
				<Input />
			</Form.Item>
			<Form.Item label='Date' name='date'>
				<RangePicker style={{ width: '130%' }} showTime />
			</Form.Item>
			<Form.Item label='Subject' name='subject'>
				<Input />
			</Form.Item>
			<Form.Item name='status' label='Status' valuePropName='checked'>
				<Switch />
			</Form.Item>
			<Form.Item name='text' label='Text'>
				<BraftEditor
					className='braftEditorCard'
					language='en'
					placeholder='Enter your content here'
					excludeControls={excludeControls}
				/>
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button htmlType='button' onClick={onReset}>
					Reset
				</Button>
				<Button type='primary' htmlType='submit'>
					Update
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AutorepliesForm;
