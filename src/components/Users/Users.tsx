/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description Users screen
 */

import React from 'react';
import { Button } from 'antd';

import Link from 'app-ui/components/CustomLink';
import Page from 'components/Page';
import showConfirm from 'app-ui/utils/showConfirm';
import FilterSearch from './FilterSearch';
import UsersTable from './UsersTable';
import ResetPassword from './ResetPassword';

import useRecalculateQuotaForAll from 'app-ui/hooks/useRecalculateQuotaForAll';

const Users: React.FC = () => {
	const { mutate } = useRecalculateQuotaForAll();

	return (
		<Page
			title='Users'
			extra={[
				<Button
					key='recalculate-quota-for-all-users'
					onClick={() =>
						showConfirm(() => mutate(), 'Are you sure you want to Recalculate Quota For All Users ?')
					}
				>
					Recalculate Quota For All Users
				</Button>,
				<Button key='users-create-new-user' type='primary'>
					<Link to='/users/create-new-user'>Add User</Link>
				</Button>,
			]}
		>
			<FilterSearch />
			<UsersTable />
			<ResetPassword />
		</Page>
	);
};

export default Users;
