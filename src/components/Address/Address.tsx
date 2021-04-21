/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description Address Component
 */

import React from 'react';
import { useValues } from 'kea';

import CreateNewAddress from '../CreateNewAddress';
import AddressTable from './AddressTable';
import AddressInformation from './AddressInformation';

import addressLogic from 'app-ui/logic/addressLogic';

/**
 * Address Component
 */
const Address: React.FC = () => {
	const { creatNewAddressToggle, addressInformationToggle } = useValues(addressLogic);

	if (creatNewAddressToggle) return <CreateNewAddress />;
	else if (addressInformationToggle) return <AddressInformation />;
	else return <AddressTable />;
};

export default Address;
