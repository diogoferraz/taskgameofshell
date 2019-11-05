import React from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import Circle from '../assets/images/circle.svg';
import '../assets/styles.scss';

const numFlipKey = () => Math.floor(Math.random() * 100) + 1;

const Content = (props) => (
	<div className={'content'}>
		{props.overlay && <div className={'overlay'} onClick={(e) => e.preventDefault()} />}
		<Flipper flipKey={numFlipKey()}>
			<ul className={'list'}>
				{props.data.map(d => (
					<Flipped key={d.id} flipId={d.id}
						onComplete={() => props.onCompleteShuffle()}>
						<li key={d.id}>
							<div key={d.id} onClick={() => props.onClickShell(d.id)} className={'shell'} >
								{d.ball && <img src={Circle} className={`image ${props.hideImage ? 'hide' : ''}`} alt={''} />}
							</div>
						</li>
					</Flipped>
				))}
			</ul>
		</Flipper>
	</div>
);

export default Content;