/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description add/update filter form
 */

import React, { useEffect } from 'react';
import _ from 'lodash';
import { Input, Switch, Select, Button, Space, Breadcrumb } from 'antd';
import { useActions, useValues } from 'kea';
import { useParams } from 'react-router-dom';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import Form from 'antd/lib/form';
import Modal from 'antd/lib/modal';

import { tailLayout } from '../FormLayout';
import { Page } from '../Page/Page';

import filtersLogic from 'app-ui/logic/filtersLogic';
import { filtersTooltip } from 'app-ui/lib/constants/constant';
import { CreateFilterRequest } from 'client/wildduck-api';

import useFilterDetails from 'app-ui/hooks/useFIlterDetails';
import useCreateFilter from 'app-ui/hooks/useCreateFilter';
import useUpdateFilter from 'app-ui/hooks/useUpdateFilter';
import useMailboxes from 'app-ui/hooks/useMailboxes';

interface Props {
	action: string;
}

const AddFiltersForm: React.FC<Props> = (props: Props) => {
	const { setShowAddFilterForm, setFilterId } = useActions(filtersLogic);
	const { filterId } = useValues(filtersLogic);
	const [form] = Form.useForm();
	const { confirm } = Modal;

	const params: { id: string } = useParams();
	const { data, isLoading } = useFilterDetails(params.id, filterId);
	const { data: mailboxesList } = useMailboxes({ userId: params.id });
	const { mutate: createFilter } = useCreateFilter();
	const { mutate: updateFilter } = useUpdateFilter();

	const onFinish = (values: any) => {
		const query = _.pick(values, ['from', 'to', 'subject', 'listId', 'text', 'ha', 'size']);
		const action = _.pick(values, ['seen', 'flag', 'delete', 'spam', 'mailbox', 'targets']);
		const filter: any = _.pick(values, ['name', 'disabled']);

		_.set(filter, 'query', query);
		_.set(filter, 'action', action);
		showConfirm(filter);
	};

	function showConfirm(filter: CreateFilterRequest) {
		confirm({
			title: 'Are you sure you want to save this Filter ?',
			icon: <ExclamationCircleOutlined />,

			onOk() {
				props.action === 'create'
					? createFilter({ userId: params.id, filterDetails: filter })
					: updateFilter({ userId: params.id, filterId: filterId, filterDetails: filter });
			},
		});
	}

	const reset = () => {
		form.resetFields();
	};

	useEffect(() => {
		form.setFieldsValue({ ...data });
	}, [data]);

	const pageBreadcrumb = (
		<Breadcrumb>
			<Breadcrumb.Item>
				<a
					onClick={(event) => {
						event.stopPropagation();
						setShowAddFilterForm(false);
						setFilterId('');
					}}
				>
					Filters
				</a>
			</Breadcrumb.Item>
			<Breadcrumb.Item>{props.action === 'create' ? 'Add Filter' : 'Update Filter'}</Breadcrumb.Item>
		</Breadcrumb>
	);

	return (
		<Page title={pageBreadcrumb} loading={isLoading}>
			<Form wrapperCol={{ span: 6 }} labelCol={{ span: 3 }} form={form} onFinish={onFinish}>
				<Form.Item label='Filter name' name='name'>
					<Input placeholder='Name of the Filter' />
				</Form.Item>
				<Form.Item label='Query' tooltip={filtersTooltip.query}>
					{_.map(['from', 'to', 'subject', 'listId', 'text'], (query) => {
						return (
							<Form.Item key={query} name={query} label={query} tooltip={_.get(filtersTooltip, query)}>
								<Input />
							</Form.Item>
						);
					})}
					<Form.Item name='ha' label='has attachment' tooltip={filtersTooltip.ha} valuePropName='checked'>
						<Switch />
					</Form.Item>
					<Form.Item name='size' label='size' tooltip={filtersTooltip.size}>
						<Input />
					</Form.Item>
				</Form.Item>
				<Form.Item label='Action' tooltip={filtersTooltip.action}>
					{_.map(['seen', 'flag', 'delete', 'spam'], (query) => {
						return (
							<Form.Item
								name={query}
								key={query}
								label={query}
								tooltip={_.get(filtersTooltip, query)}
								valuePropName='checked'
							>
								<Switch />
							</Form.Item>
						);
					})}
					<Form.Item name='mailbox' label='Mailbox' tooltip={filtersTooltip.mailbox}>
						<Select showSearch>
							{_.map(mailboxesList, (mailbox: any) => {
								return (
									<Select.Option value={mailbox?.id} key={mailbox?.name + mailbox?.id}>
										{mailbox?.name}
									</Select.Option>
								);
							})}
						</Select>
					</Form.Item>
					<Form.Item name='targets' label='Targets' tooltip={filtersTooltip.targets}>
						<Select mode='tags' placeholder='Enter Targets' />
					</Form.Item>
				</Form.Item>
				<Form.Item
					name='disabled'
					label='Disable Filter'
					tooltip={filtersTooltip.disabled}
					valuePropName='checked'
				>
					<Switch />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Space size='middle'>
						<Button type='default' htmlType='button' onClick={reset}>
							Reset
						</Button>
						<Button type='primary' htmlType='submit'>
							Save
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Page>
	);
};

export default AddFiltersForm;
