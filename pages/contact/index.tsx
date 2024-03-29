import React from 'react';
import { useSelector } from 'react-redux';
import { Contact } from '../../components';
import { type RootState } from '../../redux';

const Template = () => {
	const navigationHeight = useSelector(
		(state: RootState) => state.basic.navigationHeight
	);

	return (
		<div
			className="bg-white"
			style={{
				marginTop: navigationHeight + 'px',
			}}
		>
			<Contact />
		</div>
	);
};

export default Template;
