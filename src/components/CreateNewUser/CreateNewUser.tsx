/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description Add Users screen
 */

import React from 'react';
import { Breadcrumb } from 'antd';

import Page from 'components/Page';
import Link from 'app-ui/components/CustomLink';
import CreateNewUserForm from './CreateNewUserForm';

const CreateNewUser: React.FC = () => {
	const pageBreadcrumb = (
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link to='/users'>Users</Link>
			</Breadcrumb.Item>
			<Breadcrumb.Item>Add User</Breadcrumb.Item>
		</Breadcrumb>
	);

	return (
		<Page title={pageBreadcrumb}>
			<CreateNewUserForm />
		</Page>
	);
};

export default CreateNewUser;
