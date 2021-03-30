import { connect } from 'kea';
import ErrorBoundary from './ErrorBoundary';
import appLogic from 'app-redux/logic/appLogic';

const logic = connect({
	values: [appLogic, ['error']],
	actions: [appLogic, ['setError']],
});

export default logic(ErrorBoundary) as any;
