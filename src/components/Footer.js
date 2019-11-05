import React from 'react';
import '../assets/styles.scss';

const Footer = (props) => (
	<div className={'footer'}>
		<button className={`button ${props.startRunning ? 'disabled' : ''}`} onClick={props.onShuffleStart} disabled={props.startRunning}>Start</button>
		<button className={'button'} onClick={props.onRetry}>Restart</button>
	</div>
);

export default Footer;