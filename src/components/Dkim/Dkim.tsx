/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description Dkim screen
 */

import React from 'react';
import { useActions } from 'kea';
import { Button, Input, Row, Col } from 'antd';

import Page from 'components/Page';
import Link from 'app-ui/components/CustomLink';
import DkimTable from './DkimTable';

import dkimLogic from 'logic/dkimLogic';

/**
 * Dkim component
 */
const Dkim: React.FC = () => {
	const { setQuery } = useActions(dkimLogic);

	const { Search } = Input;

	const FilterSearch = () => {
		const onFinish = (values: any) => {
			setQuery(values);
		};

		return <Search size='large' placeholder='Query' allowClear enterButton='Search' onSearch={onFinish} />;
	};

	return (
		<Page
			title='Dkim'
			extra={[
				<Button key='dkim-create-dkim' type='primary'>
					<Link to='/dkim/create-dkim'>Create DKIM key for Domain</Link>
				</Button>,
			]}
		>
			<Row gutter={[8, 8]}>
				<Col xs={24}>{<FilterSearch />}</Col>
				<Col xs={24}>
					<DkimTable />
				</Col>
			</Row>
		</Page>
	);
};

export default Dkim;
