import React from 'react';
import { Table, Tooltip } from 'antd';
import { useActions } from 'kea';
import _ from 'lodash';
import { useParams } from 'react-router-dom';

import { DiffOutlined } from '@ant-design/icons';
import FloatingButton from '../FloatingButton';
import { getAddressColumns } from './Columns';

import useAddress from 'app-ui/hooks/useAddress';
import useDeleteAddress from 'app-ui/hooks/useDeleteAddress';

import addressLogic from 'app-ui/logic/addressLogic';

const AddressTable: React.FC = () => {
	const { setAddressInformationToggle, setCreatNewAddressToggle, setAddressId } = useActions(addressLogic);

	const { id }: any = useParams();

	const { data, isLoading } = useAddress(id);

	const { mutate } = useDeleteAddress();

	const columns = React.useMemo(
		() =>
			getAddressColumns({
				dataSource: data,
				edit: (addressId: string) => {
					setAddressId(addressId);
					setAddressInformationToggle(true);
				},
				deleteAddress: (addressId: string) => mutate({ userId: id, addressId: addressId }),
			}),
		[data],
	);

	return (
		<>
			<Table
				loading={isLoading}
				size='small'
				columns={columns}
				dataSource={data}
				pagination={_.size(data) > 10 ? null : false}
			/>
			<FloatingButton>
				<Tooltip title='Create New Address'>
					<DiffOutlined
						onClick={() => {
							setCreatNewAddressToggle(true);
						}}
					/>
				</Tooltip>
			</FloatingButton>
		</>
	);
};

export default AddressTable;
