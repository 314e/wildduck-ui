import { connect } from 'kea';
import ErrorBoundary from './ErrorBoundary';
import appLogic from 'app-ui/logic/appLogic';

const logic = connect({
	values: [appLogic, ['error']],
	actions: [appLogic, ['setError']],
});

export default logic(ErrorBoundary) as any;
