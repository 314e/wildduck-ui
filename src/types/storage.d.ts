declare namespace Storage {
	interface IStorage {
		id: string;
		filename: string;
		size: number;
	}
	type IStorageList = IStorage[];
}
