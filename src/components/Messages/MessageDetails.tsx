/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description message details
 */

import React from 'react';
import _ from 'lodash';
import { Breadcrumb, Card, Descriptions, Row, Col, Tooltip, Button } from 'antd';
import { useValues, useActions } from 'kea';
import { useParams } from 'react-router-dom';
import BraftEditor from 'braft-editor';
import moment from 'moment';

import Page from '../Page';
import { DATE_TIME_FORMAT_AP } from 'app-ui/utils/constants';
import { DownloadOutlined } from '@ant-design/icons';
import useDownloadAttachment from 'app-ui/hooks/useDownloadAttachment';

import useMessageDetails from 'app-ui/hooks/useMessageDetails';

import messagesLogic from 'app-redux/logic/messagesLogic';
import mailboxesLogic from 'app-redux/logic/mailboxesLogic';

const MessageDetails: React.FC = () => {
	const { id }: any = useParams();

	const { mailboxId, mailboxName } = useValues(mailboxesLogic);
	const { messageId, attachmentId } = useValues(messagesLogic);

	const attachment = useDownloadAttachment({
		userId: id,
		attachment: attachmentId,
		mailboxId: mailboxId,
		messageId: messageId,
	});

	const { data, isLoading, isError } = useMessageDetails({ userId: id, mailboxId: mailboxId, messageId: messageId });

	const { setMessageDetailsToggle, setAttachmentId } = useActions(messagesLogic);
	const { setUpdateMailboxToggle, setShowMailboxMessagesTable } = useActions(mailboxesLogic);

	const pageBreadcrumb = (
		<Breadcrumb>
			<Breadcrumb.Item>
				<a
					onClick={() => {
						setUpdateMailboxToggle(false);
						setShowMailboxMessagesTable(false);
					}}
				>
					Mailboxes
				</a>
			</Breadcrumb.Item>
			<Breadcrumb.Item>
				<a
					onClick={(event) => {
						event.stopPropagation();
						setMessageDetailsToggle(false);
					}}
				>
					{mailboxName}
				</a>
			</Breadcrumb.Item>
			<Breadcrumb.Item>Message</Breadcrumb.Item>
		</Breadcrumb>
	);

	const MessageTitle = (
		<div>
			<p>From : {`${_.get(data, 'from.name', '')}<${_.get(data, 'from.address', '')}>`}</p>
			<p>To : {`${_.get(data, 'to.0.name', '')}<${_.get(data, 'to.0.address', '')}>`}</p>
			<p>Subject : {_.get(data, 'subject', '')}</p>
		</div>
	);
	return (
		<Page title={pageBreadcrumb} loading={isLoading} error={isError}>
			{_.isUndefined(data) ? null : (
				<Card title={MessageTitle} extra={<>{moment(data.date).format(DATE_TIME_FORMAT_AP)}</>}>
					<BraftEditor language='en' controls={[]} value={BraftEditor.createEditorState(data.html[0])} />
					{_.isEmpty(data.attachments) ? null : (
						<Descriptions size='small' bordered column={1}>
							<Descriptions.Item label='Attachments'>
								{_.map(data.attachments, (attachment, index) => {
									return (
										<Row>
											<Col>
												<p key={_.get(attachment, 'filename', 'temp') + index}>
													Filename: {_.get(attachment, 'filename', '')}
													<br />
													Content Type: {_.get(attachment, 'contentType', '')}
													<br />
													Size: {_.get(attachment, 'sizeKb', '')} KB
												</p>
											</Col>
											<Col offset={1}>
												<Tooltip title={'Download file'}>
													<Button
														className='ant-btn-icon'
														shape='circle'
														onClick={() => {
															setAttachmentId(attachment);
														}}
													>
														<DownloadOutlined className={'blue-color'} />
													</Button>
												</Tooltip>
											</Col>
										</Row>
									);
								})}
							</Descriptions.Item>
						</Descriptions>
					)}
				</Card>
			)}
		</Page>
	);
};

export default MessageDetails;
