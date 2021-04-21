/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description CreateNewAddress Component
 */

import React from 'react';
import { Breadcrumb } from 'antd';
import { useActions } from 'kea';

import Page from '../Page';
import CreateNewAddressForm from './CreateNewAddressForm';

import addressLogic from 'app-ui/logic/addressLogic';

/**
 * CreateNewAddress Component
 */
const CreateNewAddress: React.FC = () => {
	const { setCreatNewAddressToggle } = useActions(addressLogic);

	const pageBreadcrumb = (
		<Breadcrumb>
			<Breadcrumb.Item>
				<a
					onClick={(event) => {
						event.stopPropagation();
						setCreatNewAddressToggle(false);
					}}
				>
					Address Info
				</a>
			</Breadcrumb.Item>
			<Breadcrumb.Item>Create New Address</Breadcrumb.Item>
		</Breadcrumb>
	);

	return (
		<Page title={pageBreadcrumb}>
			<CreateNewAddressForm />
		</Page>
	);
};

export default CreateNewAddress;
