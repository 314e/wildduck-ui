/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description ForwardedAddress Component
 */

import React from 'react';
import { Button, Breadcrumb, Row, Col } from 'antd';
import { useActions, useValues } from 'kea';

import Link from 'app-ui/components/CustomLink';
import Page from '../Page';
import Search from 'antd/lib/input/Search';
import RenameDomain from './RenameDomain';
import ForwardedAddressTable from './ForwardedAddressTable';

import addressLogic from 'logic/addressLogic';

/**
 * ForwardedAddress Component
 */
const ForwardedAddress: React.FC = () => {
	const { error, renameDomainToggle, query } = useValues(addressLogic);
	const { setQuery, setRenameDomainToggle } = useActions(addressLogic);

	const onSearch = (value: string) => {
		setQuery(value);
	};

	return !renameDomainToggle ? (
		<RenameDomain />
	) : (
		<Page
			title='Forwarded addresses'
			error={error}
			extra={[
				<Button
					hidden={!renameDomainToggle}
					key='rename-domain'
					type='primary'
					onClick={() => setRenameDomainToggle(false)}
				>
					Rename Domain
				</Button>,
				<Button hidden={!renameDomainToggle} key='address-create-new-fowarded-address' type='primary'>
					<Link to='/forwarded-addresses/create-new-forwarded-address'>Create new forwarded address</Link>
				</Button>,
			]}
		>
			<Row gutter={[8, 8]}>
				<Col xs={24}>
					<Search
						size='large'
						placeholder='Enter forwarded address'
						allowClear
						enterButton='Search'
						onSearch={onSearch}
					/>
				</Col>
				<Col xs={24}>
					<ForwardedAddressTable />
				</Col>
			</Row>
		</Page>
	);
};

export default ForwardedAddress;
