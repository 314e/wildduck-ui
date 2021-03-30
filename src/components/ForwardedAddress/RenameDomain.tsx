/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description RenameDomain Component
 */

import React from 'react';
import _ from 'lodash';
import { Form, Input, Button, Breadcrumb } from 'antd';
import { useActions } from 'kea';

import { SAddress } from '../../lib/constants/constant';
import Page from '../Page';
import Link from 'app-ui/components/CustomLink';

import useRenameDomain from 'app-ui/hooks/useRenameDomain';

import addressLogic from 'logic/addressLogic';

/**
 * RenameDomain Component
 */
const RenameDomain: React.FC = () => {
	const { setRenameDomainToggle } = useActions(addressLogic);
	const { setForwardedAddressInfo, loading, error } = useActions(addressLogic);
	const [form] = Form.useForm();

	const { mutate } = useRenameDomain();

	const onFinishDomain = (values: { oldDomain: string; newDomain: string }) => {
		mutate(values);
		setRenameDomainToggle(true);
		setForwardedAddressInfo({});
	};

	const onResetDomain = () => {
		form.resetFields();
	};

	const breadcrum = (
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link to='/forwarded-addresses' onClick={() => setRenameDomainToggle(true)}>
					Forwarded Addresses
				</Link>
			</Breadcrumb.Item>
			<Breadcrumb.Item>Rename domain</Breadcrumb.Item>
		</Breadcrumb>
	);

	return (
		<Page title={breadcrum} loading={loading} error={error}>
			<Form
				layout={'inline'}
				name='basic'
				form={form}
				initialValues={{ remember: true }}
				onFinish={onFinishDomain}
			>
				<Form.Item
					label='Old Domain'
					name='oldDomain'
					tooltip={_.get(SAddress, 'RenameDomain.oldDomain')}
					rules={[{ required: true, message: 'Please input your old domain!' }]}
				>
					<Input placeholder='example.com' />
				</Form.Item>
				<Form.Item
					label='New Domain'
					name='newDomain'
					tooltip={_.get(SAddress, 'RenameDomain.newDomain')}
					rules={[{ required: true, message: 'Please input your new domain!' }]}
				>
					<Input placeholder='domain.in' />
				</Form.Item>
				<Form.Item>
					<Button htmlType='button' onClick={onResetDomain}>
						Reset
					</Button>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Page>
	);
};

export default RenameDomain;
