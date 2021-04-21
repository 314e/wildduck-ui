declare namespace IUsers {
	interface IFilterUsers {
		query?: string;
		tags?: string;
		requiredTags?: string;
		limit?: number;
		metaData?: boolean;
		internalData?: boolean;
		page?: number;
		next?: number;
		previous?: number;
	}

	interface ICreateUser {
		username: string;
		name?: string;
		password: string;
		address?: string;
		pubKey?: string;
		metaData?: string;
		internalData?: string;
		language?: string;
		sess?: string;
		ip?: string;
		address?: string;
		address?: string;
		address?: string;
		address?: string;
		tags?: string[];
		disabledScopes: string[];
		targets?: string[];
		fromWhitelist?: string[];
		autoreply?: boolean;
		encryptMessages?: boolean;
		encryptForwarded?: boolean;
		quota?: number;
		recipients?: number;
		forwards?: number;
		imapMaxUpload?: number;
		pop3MaxDownload?: number;
		pop3MaxMessages?: number;
		imapMaxConnections?: number;
		receivedMax?: number;
		imapMaxDownload?: number;
		imapMaxDownload?: number;
		imapMaxDownload?: number;
		hasPasswordSet?: boolean;
		activated?: boolean;
		disabled?: boolean;
		suspended?: boolean;
		hashedPassword?: boolean;
		allowUnsafe?: boolean;
		requirePasswordChange?: boolean;
		addTagsToAddress?: boolean;
		uploadSentMessages?: boolean;
		addTagsToAddress?: boolean;
		addTagsToAddress?: boolean;
	}

	interface IResults {
		id: string;
		username: string;
		name: string;
		address: string;
		tags: Array;
		forward: Array;
		enabled2a: string[];
		autoreply: boolean;
		encryptMessages: boolean;
		encryptForwarded: boolean;
		quota: {
			allowed: number;
			used: number;
		};
		hasPasswordSet: boolean;
		activated: boolean;
		disabled: boolean;
		suspended: boolean;
	}
}
