/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description User Details screen
 */

import React from 'react';
import { Button, Tabs, Breadcrumb, Alert, Typography } from 'antd';
import { useActions } from 'kea';
import _ from 'lodash';
import { useParams, useHistory } from 'react-router-dom';

import Link, { getBasePath } from 'app-ui/components/CustomLink';
import UserDetailsForm from './UserDetailsForm';
import Page from 'components/Page';
import Filters from '../Filters';
import Mailboxes from '../Mailboxes';
import Autoreplies from '../Autoreplies';
import Authentication from '../Authentication';
import Archive from '../Archive';
import showConfirm from 'app-ui/utils/showConfirm';
import Address from '../Address';

import useRecalculateQuota from 'app-ui/hooks/useRecalculateQuota';
import useUserDetails from 'app-ui/hooks/useUserDetails';
import useLogoutUser from 'app-ui/hooks/useLogoutUser';
import useDeleteUser from 'app-ui/hooks/useDeleteUser';
import useResetPassword from 'app-ui/hooks/useResetPassword';
import useUpdateUserDetails from 'app-ui/hooks/useUpdateUserDetails';

import filtersLogic from 'app-redux/logic/filtersLogic';
import mailboxesLogic from 'app-redux/logic/mailboxesLogic';
import addressLogic from 'app-redux/logic/addressLogic';

const { TabPane } = Tabs;

const User: React.FC = () => {
	const history = useHistory();

	const { id }: any = useParams();

	const { data } = useUserDetails(id);

	const { mutate: recalculateQuota } = useRecalculateQuota();
	const { mutate: logoutUser } = useLogoutUser();
	const { mutate: deleteUser } = useDeleteUser();
	const { mutate } = useUpdateUserDetails();
	const { mutate: resetPassword, data: password } = useResetPassword();

	React.useEffect(() => {
		if (!_.isEmpty(password)) {
			mutate({
				userId: id,
				userDetails: { password: _.get(data, 'data.password'), disabledScopes: [] },
			});
		}
	}, [password]);

	const { setShowAddFilterForm } = useActions(filtersLogic);
	const { setAddressInformationToggle, setCreatNewAddressToggle } = useActions(addressLogic);
	const { setUpdateMailboxToggle, setShowMailboxMessagesTable } = useActions(mailboxesLogic);

	const pageBreadcrumb = (
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link to='/users'>Users</Link>
			</Breadcrumb.Item>
			<Breadcrumb.Item>{_.get(data, 'address')}</Breadcrumb.Item>
		</Breadcrumb>
	);

	const tabClick = (key: string) => {
		switch (key) {
			case 'filters':
				setShowAddFilterForm(false);
				break;
			case 'address-info':
				setCreatNewAddressToggle(false);
				setAddressInformationToggle(false);
				break;
			case 'mailboxes':
				setUpdateMailboxToggle(false);
				setShowMailboxMessagesTable(false);
				break;
		}
	};

	return (
		<Page
			title={pageBreadcrumb}
			extra={[
				<Button
					key='quota'
					onClick={() =>
						showConfirm(() => recalculateQuota(id), 'Are you sure you want to Recalculate Quota ?')
					}
				>
					Recalculate Quota
				</Button>,
				<Button
					key='reset'
					onClick={() => showConfirm(() => resetPassword(id), 'Are you sure you want to Reset Password ?')}
				>
					Reset Password
				</Button>,
				<Button
					key='logout'
					onClick={() => showConfirm(() => logoutUser(id), 'Are you sure you want to Logout User ?')}
				>
					Logout
				</Button>,
				<Button
					key='delete'
					onClick={() =>
						showConfirm(() => {
							deleteUser(id);
							history.push(`${getBasePath()}/users`);
						}, 'Are you sure you want to Delete User ?')
					}
					type='primary'
				>
					Delete
				</Button>,
			]}
		>
			{_.isEmpty(_.get(password, 'data.password')) ? null : (
				<Alert
					message='New Password'
					description={
						<Typography.Paragraph copyable>{_.get(password, 'data.password')}</Typography.Paragraph>
					}
					type='success'
					showIcon
					closable
				/>
			)}
			<Tabs defaultActiveKey='user-form' onTabClick={tabClick}>
				<TabPane tab='Details' key='user-form'>
					<UserDetailsForm data={data} />
				</TabPane>
				<TabPane tab='Address Info' key='address-info'>
					<Address />
				</TabPane>
				<TabPane tab='Filters' key='filters'>
					<Filters />
				</TabPane>
				<TabPane tab='Mailboxes' key='mailboxes'>
					<Mailboxes />
				</TabPane>
				<TabPane tab='Autoreplies' key='autoreplies'>
					<Autoreplies />
				</TabPane>
				<TabPane tab='Authentication' key='authentication'>
					<Authentication />
				</TabPane>
				<TabPane tab='Archive' key='archive'>
					<Archive />
				</TabPane>
			</Tabs>
		</Page>
	);
};

export default User;
