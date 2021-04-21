import DomainAliasIcon from 'app-ui/assets/icons/DomainAliasIcon';
import ForwardedAddressesIcon from 'app-ui/assets/icons/ForwardedAddressesIcon';
import DkimIcon from 'app-ui/assets/icons/DkimIcon';
import DomainAccessIcon from 'app-ui/assets/icons/DomainAccessIcon';

type Icon = React.FC | { type: string; theme?: 'filled' | 'outlined' | 'twoTone' };

export interface IMenu {
	key: string;
	title: string;
	url: string;
	icon: Icon;
	component: string;
	hideMenu: boolean;
}

const menuConfig: IMenu[] = [
	{
		key: 'users',
		title: 'Users',
		url: '/users',
		icon: { type: 'user', theme: 'filled' },
		component: 'Users',
		hideMenu: false,
	},
	{
		key: 'create-new-user',
		title: 'Create New User',
		url: '/users/create-new-user',
		icon: { type: 'user', theme: 'filled' },
		component: 'CreateNewUser',
		hideMenu: true,
	},
	{
		key: 'user',
		title: 'User',
		url: '/users/:id',
		icon: { type: 'user', theme: 'filled' },
		component: 'User',
		hideMenu: true,
	},
	{
		key: 'forwarded-addresses',
		title: 'Forwarded Addresses',
		url: '/forwarded-addresses',
		icon: ForwardedAddressesIcon,
		component: 'ForwardedAddress',
		hideMenu: false,
	},
	{
		key: 'create-new-forwarded-address',
		title: 'Create new Forwarded address',
		url: '/forwarded-addresses/create-new-forwarded-address',
		icon: { type: 'user', theme: 'filled' },
		component: 'CreateNewForwardedAddress',
		hideMenu: true,
	},
	{
		key: 'forwarded-addresses-information',
		title: 'Forwarded Addresses Information',
		url: '/forwarded-addresses/:id',
		icon: ForwardedAddressesIcon,
		component: 'ForwardedAddressInformation',
		hideMenu: true,
	},
	{
		key: 'domain-aliases',
		title: 'Domain Aliases',
		url: '/domain-aliases',
		icon: DomainAliasIcon,
		component: 'DomainAliases',
		hideMenu: false,
	},
	{
		key: 'messages',
		title: 'Messages',
		url: '/messages',
		icon: { type: 'user', theme: 'filled' },
		component: 'Messages',
		hideMenu: true,
	},
	{
		key: 'authentication',
		title: 'Authentication',
		url: '/authentication',
		icon: { type: 'user', theme: 'filled' },
		component: 'Authentication',
		hideMenu: true,
	},
	{
		key: 'mailboxes',
		title: 'Mailboxes',
		url: '/mailboxes',
		icon: { type: 'user', theme: 'filled' },
		component: 'Mailboxes',
		hideMenu: true,
	},
	{
		key: 'create-new-mailbox',
		title: 'Create new Mailboxes',
		url: '/mailboxes/create-new-mailbox',
		icon: { type: 'user', theme: 'filled' },
		component: 'CreateNewMailbox',
		hideMenu: true,
	},
	{
		key: 'archive',
		title: 'Archive',
		url: '/archive',
		icon: { type: 'user', theme: 'filled' },
		component: 'Archive',
		hideMenu: true,
	},
	{
		key: 'autoreplies',
		title: 'Autoreplies',
		url: '/autoreplies',
		icon: { type: 'user', theme: 'filled' },
		component: 'Autoreplies',
		hideMenu: true,
	},
	{
		key: 'create-new-domain-alias',
		title: 'Create new doamin alias',
		url: '/domain-aliases/create-new-domain-alias',
		icon: { type: 'user', theme: 'filled' },
		component: 'CreateNewDomainAlias',
		hideMenu: true,
	},
	{
		key: 'dkim',
		title: 'DKIM',
		url: '/dkim',
		icon: DkimIcon,
		component: 'Dkim',
		hideMenu: false,
	},
	{
		key: 'dkimDetails',
		title: 'dkimDetails',
		url: '/dkim-details/:id',
		icon: { type: 'user', theme: 'filled' },
		component: 'DkimDetails',
		hideMenu: true,
	},
	{
		key: 'create-dkim',
		title: 'Create DKIM',
		url: '/dkim/create-dkim',
		icon: { type: 'user', theme: 'filled' },
		component: 'CreateDkim',
		hideMenu: true,
	},
	{
		key: 'resolve-id-dkim',
		title: 'Resolve Id',
		url: '/dkim/resolve-id',
		icon: { type: 'user', theme: 'filled' },
		component: 'ResolveId',
		hideMenu: true,
	},
	{
		key: 'domain-access',
		title: 'Domain Access',
		url: '/domain-access',
		icon: DomainAccessIcon,
		component: 'DomainAccess',
		hideMenu: false,
	},
];
export default menuConfig;
