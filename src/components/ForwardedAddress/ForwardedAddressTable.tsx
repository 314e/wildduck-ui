/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description ForwardedAddress Table
 */

import React from 'react';
import _ from 'lodash';
import { Table } from 'antd';
import { useValues } from 'kea';

import { getForwardedAddressColumns } from './Columns';

import useDeleteForwadedAddress from 'app-ui/hooks/useDeleteForwardedAddress';
import useForwadedAddress from 'app-ui/hooks/useForwardedAddress';

import addressLogic from 'logic/addressLogic';

/**
 * ForwardedAddressTable Component
 */

const ForwardedAddressTable = (): JSX.Element => {
	const { query } = useValues(addressLogic);

	const { data, isLoading } = useForwadedAddress({ query: query });

	const { mutate } = useDeleteForwadedAddress();

	const forwardedAddressData = _.filter(data, (address) => _.get(address, 'forwarded'));

	const columns = React.useMemo(
		() =>
			getForwardedAddressColumns({
				dataSource: forwardedAddressData,
				deleteAddress: (addressId: string) => mutate(addressId),
			}),
		[forwardedAddressData],
	);

	return (
		<Table
			loading={isLoading}
			size='small'
			bordered={true}
			columns={columns}
			dataSource={forwardedAddressData}
			scroll={{ y: 500 }}
		/>
	);
};

export default ForwardedAddressTable;
