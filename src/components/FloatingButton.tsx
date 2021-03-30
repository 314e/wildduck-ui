/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description Floating Button
 */

import React from 'react';

export interface FloatingButtonProps {
	children?: React.ReactNode;
}

const FloatingButton: React.SFC<FloatingButtonProps> = (props: FloatingButtonProps) => {
	return (
		<div id='container-floating'>
			<div className='nd1 nds' data-toggle='tooltip' data-placement='left' data-original-title='Edoardo@live.it'>
				<p className='letter'>{props.children}</p>
			</div>
			<div id='floating-button' data-toggle='tooltip' data-placement='left' data-original-title='Create'>
				<p className='plus'>+</p>
				<img
					className='edit'
					src='http://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/bt_compose2_1x.png'
				/>
			</div>
		</div>
	);
};

export default FloatingButton;
