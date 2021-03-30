/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description AddressInformation Component
 */

import React from 'react';
import { Breadcrumb } from 'antd';
import { useActions, useValues } from 'kea';
import { useParams } from 'react-router-dom';

import Page from '../Page';
import AddressInformationForm from './AddressInformationForm';

import useAddressInformation from 'app-ui/hooks/useAddressInformation';

import addressLogic from 'logic/addressLogic';

/**
 * AddressInformation Component
 */
const AddressInformation: React.FC = () => {
	const { addressId } = useValues(addressLogic);

	const { id }: any = useParams();

	const { data, isLoading, isError } = useAddressInformation(id, addressId);
	const { setAddressInformationToggle } = useActions(addressLogic);

	const pageBreadcrumb = (
		<Breadcrumb>
			<Breadcrumb.Item>
				<a
					onClick={(event) => {
						event.stopPropagation();
						setAddressInformationToggle(false);
					}}
				>
					Address Info
				</a>
			</Breadcrumb.Item>
			<Breadcrumb.Item>Edit Address</Breadcrumb.Item>
		</Breadcrumb>
	);

	return (
		<Page title={pageBreadcrumb} loading={isLoading} error={isError}>
			<AddressInformationForm data={data} />
		</Page>
	);
};

export default AddressInformation;
