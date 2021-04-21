/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description RestoreAllMessagesModal Component
 */

import React from 'react';
import { Modal, Typography, DatePicker } from 'antd';
import { useActions, useValues } from 'kea';
import _ from 'lodash';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DATE_TIME_FORMAT } from 'app-ui/utils/constants';
import useRestoreArchiveMessages from 'app-ui/hooks/useRestoreArchiveMessages';

import archiveLogic from 'app-ui/logic/archiveLogic';

const { Title } = Typography;

const { RangePicker } = DatePicker;

const RestoreAllMessagesModal = () => {
	const { setDateData, setIsModalVisible } = useActions(archiveLogic);
	const { dateData, isModalVisible } = useValues(archiveLogic);

	const { id }: any = useParams();

	const { mutate } = useRestoreArchiveMessages();

	const handleOk = () => {
		mutate({
			userId: id,
			params: {
				start: _.get(dateData, '0', moment('2000-01-01 00:00:00')).format(DATE_TIME_FORMAT),
				end: _.get(dateData, '1', moment()).format(DATE_TIME_FORMAT),
			},
		});
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setDateData([]);
	};

	return (
		<Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
			<Title level={4}>
				<ExclamationCircleOutlined />
				Are you sure you want to Restore all messages ?
			</Title>
			<p>Select the start and end date (by default it will restores all the mails).</p>
			<RangePicker
				disabledDate={(current) => current && current > moment().endOf('day')}
				onChange={(value) => setDateData(value)}
				showTime
				defaultValue={
					_.isEmpty(dateData) ? ('' as any) : [moment(_.get(dateData, '0')), moment(_.get(dateData, '1'))]
				}
			/>
		</Modal>
	);
};

export default RestoreAllMessagesModal;
