/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description CreateNewForwardedAddress Component
 */

import React from 'react';
import { Breadcrumb } from 'antd';

import Link from 'app-ui/components/CustomLink';
import Page from '../Page';
import CreateNewForwardedAddressForm from './CreateNewForwardedAddressForm';

/**
 * CreateNewForwardedAddress Component
 */
const CreateNewForwardedAddress: React.FC = () => {
	const breadcrum = (
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link to='/forwarded-addresses'>Forwarded Addresses</Link>
			</Breadcrumb.Item>
			<Breadcrumb.Item>Create new Forwarded Address</Breadcrumb.Item>
		</Breadcrumb>
	);

	return (
		<Page title={breadcrum}>
			<CreateNewForwardedAddressForm />
		</Page>
	);
};

export default CreateNewForwardedAddress;
