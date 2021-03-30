/**
 * DATE_WITH_TIME
 * @type {string}
 * @exports
 */
const DATE_WITH_TIME = 'MM/DD/YYYY hh:mm';

const SAddress = {
	RequestAddressInfo: {
		success: 'Indicates successful response',
		id: 'ID of the Address',
		name: 'Identity name',
		address: 'E-mail address string',
		tags: 'List of tags associated with the Address',
		metaData: 'Metadata object (if available)',
		internalData: 'Internal metadata object (if available), not included for user-role requests',
		main: 'Indicates if this is the default address for the User',
		created: 'Datestring of the time the address was created',
	},
	UpdateAddressInfo: {
		user: 'ID of the User',
		address: 'ID of the Address',
		name: 'Identity name',
		address2: `New address if you want to rename existing address. Only affects normal addresses,
			special addresses that include * can not be changed`,
		main: 'Indicates if this is the default address for the User',
		metaData: 'Optional metadata, must be an object or JSON formatted string',
		internalData: `Optional metadata for internal use, must be an object or JSON formatted string of an object. 
			Not available for user-role tokens`,
		tags: 'A list of tags associated with this address',
	},
	RequestForwardedAddressInfo: {
		success: 'Indicates successful response',
		id: 'ID of the Address',
		address: 'E-mail address string',
		name: 'Identity name',
		targets: 'List of forwarding targets',
		limits: {
			about: 'Account limits and usage',
			forwards: {
				about: 'Forwarding quota',
				allowed: 'How many messages per 24 hours can be forwarded',
				used: 'How many messages are forwarded during current 24 hour period',
				ttl: 'Time until the end of current 24 hour period',
			},
		},
		autoreply: 'Autoreply information',
		created: 'Datestring of the time the address was created',
		tags: 'List of tags associated with the Address',
		forwardedDisabled: 'If true then the forwarded address is disabled',
	},
	UpdateForwardedAddressInfo: {
		address: 'New address. Only affects normal addresses, special addresses that include * can not be changed',
		name: 'Identity name',
		targets: `An array of forwarding targets. The value could either be an email address or a relay url to 
			next MX server ("smtp://mx2.zone.eu:25") or an URL where mail contents are POSTed to. 
			If set then overwrites previous targets array`,
		forwards: 'Daily allowed forwarding count for this address',
		autoreply: {
			about: 'Autoreply Information',
			status: 'If true, then autoreply is enabled for this address',
			start: 'Either a date string or boolean false to disable start time checks',
			end: 'Either a date string or boolean false to disable end time checks',
			name: 'Name that is used for the From: header in autoreply message',
			subject: 'Autoreply subject line',
			text: 'Autoreply plaintext content',
			html: 'Autoreply HTML content',
		},
		tags: 'A list of tags associated with this address',
		forwardedDisabled: 'If true then disables forwarded address (stops forwarding messages)',
		internalData: `Optional metadata for internal use, must be an object or JSON formatted string of an object. 
		Not available for user-role tokens`,
		metaData: 'Optional metadata, must be an object or JSON formatted string',
	},
	RenameDomain: {
		oldDomain: 'Old Domain Name',
		newDomain: 'New Domain Name',
	},
	CreateAddress: {
		address: 'E-mail Address',
		name: 'Identity name',
		tags: 'A list of tags associated with this address',
		main: 'Indicates if this is the default address for the User',
		allowWildcard: `If true then address value can be in the form of *@example.com, *suffix@example.com 
			and username@*, otherwise using * is not allowed. Static suffix can be up to 32 characters long.`,
		metaData: 'Optional metadata, must be an object or JSON formatted string',
		internalData: `Optional metadata for internal use, must be an object or JSON formatted string of an object. 
			Not available for user-role tokens`,
	},
	CreateForwardedAddress: {
		address: 'E-mail Address',
		name: 'Identity name',
		targets: `An array of forwarding targets. The value could either be an email address or a relay url to 
			next MX server ("smtp://mx2.zone.eu:25") or an URL where mail contents are POSTed to`,
		forwards: 'Daily allowed forwarding count for this address',
		allowWildcard:
			'If true then address value can be in the form of *@example.com, otherwise using * is not allowed',
		metaData: 'Optional metadata, must be an object or JSON formatted string',
		tags: 'A list of tags associated with this address',
		internalData: `Optional metadata for internal use, must be an object or JSON formatted string of an object. 
			Not available for user-role tokens`,
		autoreply: {
			about: 'Autoreply Information',
			status: 'If true, then autoreply is enabled for this address',
			start: 'Either a date string or boolean false to disable start time checks',
			end: 'Either a date string or boolean false to disable end time checks',
			name: 'Name that is used for the From: header in autoreply message',
			subject: 'Autoreply subject line',
			text: 'Autoreply plaintext content',
			html: 'Autoreply HTML content',
		},
	},
};

const userTooltip = {
	name: 'Name of the User',
	username: `Username of the User. Dots are allowed but informational only ("user.name" is the same as "username").`,
	hashedPassword: `If true then password is already hashed, so store as. Supported hashes: pbkdf2, 
		bcrypt ($2a, $2y, $2b), md5 ($1), sha512 ($6), sha256 ($5), argon2 ($argon2d, $argon2i, $argon2id). 
		Stored hashes are rehashed to pbkdf2 on first successful password check.`,
	allowUnsafe: `If false then validates provided passwords against Have I Been Pwned API. Experimental, 
		so validation is disabled by default but will be enabled automatically in some future version of WildDuck.`,
	address: 'Default email address for the User (autogenerated if not set)',
	emptyAddress: `If true then do not autogenerate missing email address for the User. 
		Only needed if you want to create a user account that does not have any email address associated`,
	requirePasswordChange:
		'If true then requires the user to change password, useful if password for the account was autogenerate',
	addTagsToAddress: 'If true then autogenerated address gets the same tags as the user',
	retention: 'Default retention time in ms. Set to 0 to disable',
	uploadSentMessages: `If true then all messages sent through MSA are also uploaded to the Sent Mail folder. 
		Might cause duplicates with some email clients, so disabled by default.`,
	encryptMessages: 'If true then received messages are encrypted',
	encryptForwarded: 'f true then forwarded messages are encrypted',
	pubKey: 'Public PGP key for the User that is used for encryption. Use empty string to remove the key',
	metaData: 'Optional metadata, must be key value pair',
	internalData: `Optional metadata for internal use, must be an object or JSON formatted string of an object. 
		Not available for user-role tokens`,
	language: 'Language code for the User',
	targets: `An array of forwarding targets. The value could either be an email address or a relay url to 
		next MX server ("smtp://mx2.zone.eu:25") or an URL where mail contents are POSTed to`,
	spamLevel: 'Relative scale for detecting spam. 0 means that everything is spam, 100 means that nothing is spam',
	quota: 'Allowed quota of the user in bytes',
	recipients: 'How many messages per 24 hour can be sent',
	forwards: 'How many messages per 24 hour can be forwarded',
	imapMaxUpload: 'How many bytes can be uploaded via IMAP during 24 hour',
	imapMaxDownload: 'How many bytes can be downloaded via IMAP during 24 hour',
	pop3MaxDownload: 'How many bytes can be downloaded via POP3 during 24 hour',
	pop3MaxMessages: 'How many latest messages to list in POP3 session',
	imapMaxConnections: 'How many parallel IMAP connections are alowed',
	receivedMax: 'How many messages can be received from MX during 60 seconds',
	disabledScopes: 'List of scopes that are disabled for this user ("imap", "pop3", "smtp")',
	fromWhitelist: 'A list of additional email addresses this user can send mail from. Wildcard is allowed.',
	sess: 'Session identifier for the logs',
	ip: 'IP address for the logs',
	tags: 'A list of tags associated with this address',
	mailboxes: 'Optional names for special mailboxes',
	sent: 'Path of Sent Mail folder',
	junk: 'Path of junkfolder',
	drafts: ' Path of drafts folder',
	trash: 'Path of trash folder',
	disable2fa: 'If true, then disables 2FA for this user',
	disabled: 'If true then disables user account (can not login, can not receive messages)',
	suspended: 'If true then disables authentication',
};

const dkimTooltip = {
	domain: `Domain name this DKIM key applies to. Use "*" as a special value that will be used for domains 
		that do not have their own DKIM key set`,
	selector: 'Selector for the key',

	description: 'Key description',

	privateKey: `Pem formatted DKIM private key. If not set then a new 2048 bit RSA key is generated, 
		beware though that it can take several seconds to complete.`,
};

const accessTokenString = 'accessToken';

const apiString = 'api';

const filtersTooltip = {
	query: 'Rules that a message must match',
	from: 'Partial match for the From: header (case insensitive)',
	to: 'Partial match for the To:/Cc: headers (case insensitive)',
	subject: 'Partial match for the Subject: header (case insensitive)',
	listId: 'Partial match for the List-ID: header (case insensitive)',
	text: 'Fulltext search against message text',
	ha: 'Does a message have to have an attachment or not',
	size: `Message size in bytes. If the value is a positive number then message needs to be larger, 
		if negative then message needs to be smaller than abs(size) value`,
	action: 'Action to take with a matching message',
	seen: 'If true then mark matching messages as Seen',
	flag: 'If true then mark matching messages as Flagged',
	delete: 'If true then do not store matching messages',
	spam: 'If true then store matching messags to Junk Mail folder',
	mailbox: 'Mailbox ID to store matching messages to',
	targets: `An array of forwarding targets.The value could either be an email address or a relay url to 
		next MX server(smtp://mx2.zone.eu:25) or an URL where mail contents are POSTed to`,
	disabled: 'If true then this filter is ignored',
};

const editMessageTooltip = {
	moveTo: 'ID of the target Mailbox if you want to move messages',
	expires: 'Either expiration date or false to turn of autoexpiration',
	seen: 'State of the \\Seen flag',
	flagged: 'State of the \\Flagged flag',
	draft: 'State of the \\Draft flag',
};

export { SAddress, userTooltip, dkimTooltip, accessTokenString, filtersTooltip, editMessageTooltip, apiString };
