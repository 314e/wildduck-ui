import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store/index';
import AxiosInterceptor from 'app-ui/lib/axios/AxiosInterceptors';
import { apiString } from 'app-ui/lib/constants/constant';

new AxiosInterceptor().inject({
	baseURL: sessionStorage.getItem(apiString),
	headers: { 'Content-Type': 'application/json' },
});

const MainApp = React.lazy(() => import('./App'));

const PersistedApp = () => (
	<Provider store={store}>
		<React.Suspense fallback={<></>}>
			<MainApp />
		</React.Suspense>
	</Provider>
);

ReactDOM.render(<PersistedApp />, document.getElementById('root'));

if ((module as any).hot) {
	(module as any).hot.accept('./index', () => {
		// tslint:disable-next-line: variable-name
		const NextApp = require('./index').default;
		ReactDOM.render(<NextApp />, document.getElementById('root'));
	});
}
