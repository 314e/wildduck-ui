/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description Archive Component
 */

import React from 'react';

import ArchiveTable from './ArchiveTable';
import RestoreAllMessagesModal from './RestoreAllMessagesModal';

/**
 * Archive Component
 */
const Archive: React.FC = () => {
	return (
		<>
			<RestoreAllMessagesModal />
			<ArchiveTable />
		</>
	);
};

export default Archive;
