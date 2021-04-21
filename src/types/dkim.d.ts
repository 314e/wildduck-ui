declare namespace IDkim {
	interface IFilterGetDkimKeysList {
		query: string;
		limit: number;
	}

	interface ICreateDkim {
		domain: string;
		selector: string;
		description?: string;
		privateKey?: string;
	}
}
