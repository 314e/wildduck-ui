/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description ResetPassword screen
 */

import React from 'react';
import { Modal, Typography } from 'antd';
import { useActions, useValues } from 'kea';

import usersLogic from 'app-ui/logic/usersLogic';

const ResetPassword: React.FC = () => {
	const { setShowResetPasswordModal, setPassword } = useActions(usersLogic);
	const { password, showResetPasswordModal } = useValues(usersLogic);

	return (
		<Modal
			title='New Password'
			visible={showResetPasswordModal}
			footer={null}
			onCancel={() => {
				setShowResetPasswordModal(false);
				setPassword('');
			}}
		>
			<Typography.Paragraph copyable>{password}</Typography.Paragraph>
		</Modal>
	);
};

export default ResetPassword;
