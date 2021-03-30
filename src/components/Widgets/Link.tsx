/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description Link
 */

import React from 'react';

import Link from 'app-ui/components/CustomLink';

interface IProps {
	name: string | JSX.Element;
	id: string;
}

/** ForwardedAddress link */
const ForwardedAddressLink = ({ id, name }: IProps): JSX.Element => {
	return <Link to={`/forwarded-addresses/${id}`}>{name}</Link>;
};

/** UserLink link */
const UserLink = ({ id, name }: IProps): JSX.Element => {
	return <Link to={`/users/${id}`}>{name}</Link>;
};

/** DkimDetailsLink */
const DkimDetailsLink = ({ id, name }: IProps): JSX.Element => {
	return <Link to={`/dkim-details/${id}`}>{name}</Link>;
};

export { ForwardedAddressLink, UserLink, DkimDetailsLink };
