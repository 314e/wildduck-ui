/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description DomainAliases Component
 */

import React from 'react';
import { Button, Breadcrumb, Col, Row } from 'antd';

import Link from 'app-ui/components/CustomLink';
import Page from '../Page';
import DomainAliasesTable from './DomainAliasesTable';
import SearchAlias from './SearchAlias';

/**
 * DomainAliases Component
 */
const DomainAliases: React.FC = () => {
	const breadcrum = (
		<Breadcrumb>
			<Breadcrumb.Item>Domain Alias</Breadcrumb.Item>
		</Breadcrumb>
	);

	return (
		<Page
			title={breadcrum}
			extra={[
				<Button key='domain-aliases-create-new-domain-alias' type='primary'>
					<Link to='/domain-aliases/create-new-domain-alias'>Create new Domain Alias</Link>
				</Button>,
			]}
		>
			<Row gutter={[8, 8]}>
				<Col xs={24}>
					<SearchAlias />
				</Col>
				<Col xs={24}>
					<DomainAliasesTable />
				</Col>
			</Row>
		</Page>
	);
};

export default DomainAliases;
