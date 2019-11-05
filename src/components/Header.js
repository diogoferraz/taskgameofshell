import React from 'react';
import '../assets/styles.scss';

const Header = (props) => (
	<div className={'header'}>
		{props.message.text && <div className={`message ${props.message.type}`}><p>{props.message.text}</p></div>}
	</div>
);

export default Header;