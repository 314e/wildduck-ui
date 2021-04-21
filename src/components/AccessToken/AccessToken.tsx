/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description access token screen
 */

import React from 'react';
import { Input, Form, Button } from 'antd';
import { useActions } from 'kea';

import Page from '../Page';
import { accessTokenString, apiString } from '../../lib/constants/constant';
import AxiosInterceptor from 'app-ui/lib/axios/AxiosInterceptors';

import appLogic from 'app-redux/logic/appLogic';

/**
 *  access token component
 */
const AccessToken: React.FC = () => {
	const { setAccessToken } = useActions(appLogic);

	const onFinish = (values: { accessToken: string; api: string }) => {
		sessionStorage.setItem(apiString, values.api);
		sessionStorage.setItem(accessTokenString, values.accessToken);
		setAccessToken(values.accessToken);

		new AxiosInterceptor().inject({
			baseURL: values.api,
			headers: { 'Content-Type': 'application/json' },
		});
	};

	return (
		<Page title='Access Token'>
			<Form onFinish={onFinish} labelCol={{ span: '2' }}>
				<Form.Item
					label='Access Token'
					name='accessToken'
					rules={[
						{
							required: true,
							message: 'Please input token!',
						},
					]}
				>
					<Input placeholder='Enter Access Token' autoComplete='off' />
				</Form.Item>
				<Form.Item
					label='API Endpoint'
					name='api'
					rules={[
						{
							required: true,
							message: 'Please input Api Endpoint!',
						},
					]}
				>
					<Input placeholder='Enter Api Endpoint' />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: '2' }}>
					<Button type='primary' htmlType='submit'>
						Login
					</Button>
				</Form.Item>
			</Form>
		</Page>
	);
};

export default AccessToken;
