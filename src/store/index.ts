import { resetContext, getContext } from 'kea';

resetContext({
	createStore: {},
	plugins: [],
});

export default getContext().store;
