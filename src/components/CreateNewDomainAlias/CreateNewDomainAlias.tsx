/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description CreateNewDomainAlias Component
 */

import React from 'react';
import { Breadcrumb } from 'antd';

import Link from 'app-ui/components/CustomLink';
import Page from '../Page';
import CreateNewDomainAliasForm from './CreateNewDomainAliasForm';

/**
 * CreateNewDomainAlias Component
 */
const CreateNewDomainAlias: React.FC = () => {
	const breadcrum = (
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link to='/domain-aliases'>Domain Aliases</Link>
			</Breadcrumb.Item>
			<Breadcrumb.Item>Create New Address</Breadcrumb.Item>
		</Breadcrumb>
	);

	return (
		<Page title={breadcrum}>
			<CreateNewDomainAliasForm />
		</Page>
	);
};

export default CreateNewDomainAlias;
