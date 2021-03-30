/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description Autoreplies Component
 */

import React from 'react';
import { Tooltip } from 'antd';
import { useParams } from 'react-router-dom';

import { DeleteOutlined } from '@ant-design/icons';
import showConfirm from 'app-ui/utils/showConfirm';
import FloatingButton from '../FloatingButton';
import Page from '../Page';
import AutorepliesForm from './AutorepliesForm';

import useDeleteAutoreply from 'app-ui/hooks/useDeleteAutoreply';
import useAutoreplyDetails from 'app-ui/hooks/useAutoreplyDetails';

import 'braft-editor/dist/index.css';
import 'styles/style.css';

/**
 * Autoreplies Component
 */
const Autoreplies: React.FC = () => {
	const { id }: any = useParams();

	const { data, isLoading, isError } = useAutoreplyDetails(id);

	const { mutate: deleteAutoreply } = useDeleteAutoreply();

	return (
		<Page loading={isLoading} error={isError}>
			<AutorepliesForm data={data} />
			<FloatingButton>
				<Tooltip title='Delete Auto Reply'>
					<DeleteOutlined
						onClick={() =>
							showConfirm(() => {
								deleteAutoreply(id);
							}, 'Are you sure you want to delete?')
						}
					/>
				</Tooltip>
			</FloatingButton>
		</Page>
	);
};

export default Autoreplies;
