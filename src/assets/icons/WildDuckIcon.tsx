import React from 'react';

const WildDuckIcon: React.FC = () => {
	return (
		<img src={require('./wildduck.png').default} alt='WildDuck UI' style={{ width: '150px', marginLeft: '12px' }} />
	);
};

export default WildDuckIcon;
