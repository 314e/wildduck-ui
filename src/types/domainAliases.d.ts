declare namespace DomainAliases {
	interface IRequstListParams {
		query: string;
		limit: number;
		page: number;
		next: number;
		previous: number;
	}

	type IDomainAliasesList = IDomainAliases[];

	interface IResolveId {
		success: boolean;
		id: string;
	}

	interface IDomainAliasInfo {
		success: boolean;
		id: string;
		alias: string;
		domain: string;
		created: string;
	}

	interface ICreateNewDomainAlias {
		domain: string;
		alias: string;
	}
}
