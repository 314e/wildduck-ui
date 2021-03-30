/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description DomainAccess screen
 */

import React, { useEffect } from 'react';
import { Button, Input, Transfer, Row, Col, Modal, Form, Select } from 'antd';
import { useActions, useValues } from 'kea';
import _ from 'lodash';

import Page from 'components/Page';
import { DeleteOutlined } from '@ant-design/icons';
import showConfirm from 'app-ui/utils/showConfirm';
import { layout, tailLayout } from '../FormLayout';

import useAllowedList from 'app-ui/hooks/useAllowedList';
import useBlockedList from 'app-ui/hooks/useBlockedList';
import useDeleteDomain from 'app-ui/hooks/useDeleteDomain';
import useCreateAllowedDomain from 'app-ui/hooks/useCreateAllowedDomain';
import useCreateBlockedDomain from 'app-ui/hooks/useCreateBlockedDomain';

import domainAccessLogic from 'logic/domainAccessLogic';

/**
 * DomainAccess component
 */
const DomainAccess: React.FC = () => {
	const { Search } = Input;
	const { setBlockedList, setTag, setAllowedList, setAddDomainModalVisiblity, setDataSource } = useActions(
		domainAccessLogic,
	);
	const { blockedList, tag, allowedList, addDomainModalVisiblity, dataSource } = useValues(domainAccessLogic);
	const { data: allowedListData, isLoading: allowedListLoading } = useAllowedList(tag);
	const { data: blockedListData, isLoading: blockedListLoading } = useBlockedList(tag);
	const { mutate } = useDeleteDomain();
	const { mutate: addDomainToAllowList } = useCreateAllowedDomain();
	const { mutate: addDomainToBlockList } = useCreateBlockedDomain();

	const onSearch = (value: string) => {
		if (value.length > 0) {
			setTag(value);
		}
	};

	const renderFooter = () => (
		<Button size='small' style={{ float: 'right', margin: 5 }} onClick={() => setAddDomainModalVisiblity(true)}>
			Add Domain
		</Button>
	);

	const onChange = (targetKeys: string[], direction: string, moveKeys: string[]) => {
		const blockList = _.filter(dataSource, (domain) => targetKeys.includes(domain.id));
		const moveList = _.filter(dataSource, (domain) => moveKeys.includes(domain.id));

		if (direction === 'right') {
			_.forEach(moveList, (domain) => addDomainToBlockList({ tag: tag, domain: domain.domain }));
			setAllowedList(_.filter(allowedList, (domain) => !moveKeys.includes(domain.id)));
		} else {
			_.forEach(moveList, (domain) => addDomainToAllowList({ tag: tag, domain: domain.domain }));
			setAllowedList(_.concat(allowedList, moveList));
		}
		setBlockedList(blockList);
	};

	useEffect(() => {
		setAllowedList(_.uniq(allowedListData));
		setBlockedList(_.uniq(blockedListData));
		setDataSource(_.uniqBy(_.concat(allowedListData, blockedListData), 'id'));
	}, [allowedListData, blockedListData]);

	const Content = ({ item }: { item: any }) => (
		<Row style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Col>{item.domain}</Col>
			<Col>
				<DeleteOutlined onClick={() => showConfirm(() => mutate(item.id))} />
			</Col>
		</Row>
	);

	const AddDomains = () => {
		const onFinish = (values: any) => {
			values.action === 'allow'
				? addDomainToAllowList({ tag: tag, domain: values.domain })
				: addDomainToBlockList({ tag: tag, domain: values.domain });
		};

		return (
			<Form {...layout} onFinish={onFinish} initialValues={{ action: 'allow' }}>
				<Form.Item
					label='Domain'
					name='domain'
					wrapperCol={{ span: '10' }}
					rules={[
						{
							required: true,
							message: 'Please input the Domain!',
						},
					]}
				>
					<Input placeholder='Domain name' />
				</Form.Item>
				<Form.Item label='Add To' name='action'>
					<Select style={{ width: 120 }}>
						<Select.Option value='allow'>Allow List</Select.Option>
						<Select.Option value='block'>Block List</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type='primary' htmlType='submit'>
						Add
					</Button>
				</Form.Item>
			</Form>
		);
	};

	return (
		<Page title='Domain Access' loading={allowedListLoading || blockedListLoading}>
			<Search
				size='large'
				placeholder='Enter a Tag'
				defaultValue={tag}
				allowClear
				enterButton='Search'
				onSearch={onSearch}
			/>

			{!_.isEmpty(tag) && !allowedListLoading && !blockedListLoading && (
				<Transfer
					dataSource={_.map(_.uniqBy(_.concat(allowedListData, blockedListData), 'id'), (domain) => ({
						...domain,
						key: domain.id,
					}))}
					targetKeys={_.map(blockedList, (domain) => domain.id)}
					titles={['Allowed List', 'Blocked List']}
					style={{ paddingTop: '5px' }}
					showSearch
					listStyle={{
						width: '90%',
						height: '90%',
					}}
					operations={['to right', 'to left']}
					render={(item: any) => ({ value: item.domain, label: <Content item={item} /> })}
					footer={renderFooter}
					onChange={onChange}
				/>
			)}
			<Modal
				title='Add Domain'
				visible={addDomainModalVisiblity}
				onCancel={() => setAddDomainModalVisiblity(false)}
				footer={null}
			>
				<AddDomains />
			</Modal>
		</Page>
	);
};

export default DomainAccess;
