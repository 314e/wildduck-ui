/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description manage actions popover
 */

import React from 'react';
import { Popover, Button, Space, Tooltip } from 'antd';
import _ from 'lodash';
import { useActions } from 'kea';

import { LogoutOutlined } from '@ant-design/icons';
import { GetUsersResult } from 'app-redux/client/wildduck-api';
import useRecalculateQuota from 'app-ui/hooks/useRecalculateQuota';
import RecalculateQuotaIcon from 'app-ui/assets/icons/RecalculateQuotaIcon';
import showConfirm from 'app-ui/utils/showConfirm';
import ResetPasswordIcon from 'app-ui/assets/icons/ResetPasswordIcon';

import useResetPassword from 'app-ui/hooks/useResetPassword';
import useLogoutUser from 'app-ui/hooks/useLogoutUser';
import useUpdateUserDetails from 'app-ui/hooks/useUpdateUserDetails';

import usersLogic from 'app-ui/logic/usersLogic';

interface ManageActionsProps {
	user: GetUsersResult;
}

const ManageActions: React.SFC<ManageActionsProps> = (props: ManageActionsProps) => {
	const { setShowResetPasswordModal, setPassword } = useActions(usersLogic);

	const { mutate: recalculateQuota } = useRecalculateQuota();
	const { mutate: logoutUser } = useLogoutUser();
	const { mutate } = useUpdateUserDetails();
	const { mutate: resetPassword, data } = useResetPassword();

	const { user } = props;

	React.useEffect(() => {
		if (!_.isEmpty(data)) {
			setPassword(_.get(data, 'data.password'));
			mutate({
				userId: user.id,
				userDetails: { password: _.get(data, 'data.password'), disabledScopes: [] },
			});
			setShowResetPasswordModal(true);
		}
	}, [data]);

	const Actions = () => {
		return (
			<Space size={'middle'}>
				<Tooltip title={'Logout User'}>
					<Button className='ant-btn-icon' shape='circle' onClick={() => logoutUser(user.id)}>
						<LogoutOutlined />
					</Button>
				</Tooltip>
				<Tooltip title={'Recalculate Quota'}>
					<Button className='ant-btn-icon' shape='circle' onClick={() => recalculateQuota(user.id)}>
						<RecalculateQuotaIcon />
					</Button>
				</Tooltip>
				<Tooltip title={'Reset Password'}>
					<Button
						className='ant-btn-icon'
						shape='circle'
						onClick={() =>
							showConfirm(() => {
								resetPassword(user.id);
							})
						}
					>
						<ResetPasswordIcon />
					</Button>
				</Tooltip>
			</Space>
		);
	};

	return (
		<Popover content={<Actions />} trigger='hover'>
			<Button type='link'>Manage</Button>
		</Popover>
	);
};

export default ManageActions;
