import React, { useState, useEffect } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import _ from 'lodash';
import './assets/styles.css';
import Circle from './assets/images/circle.svg';

const App = () => {
  const random = () => Math.floor(Math.random() * 3) + 1;
  const [data, setData] = useState([
    {id: 1, ball: true},
    {id: 2, ball: false},
    {id: 3, ball: false},
  ]);
  const [count, setCount] = useState(0);
  const [showMessage, setShowMessage] = useState('');

  const isTheOne = (e) => {
    switch(e) {
      case true:
        setShowMessage('You got it! Congratulations!');
        break;
      default:
          setShowMessage('Swing and a miss! Click on retry to try again!')
        break;
    }
  };

  const start = () => {
    _.times(5, () => {
      setData(_.shuffle(data));
      setCount(random());
    });
  };


  return (
    <div className={'wrapper'}>
      <div className={'header'}>
        {showMessage && <div className={'message'}>{showMessage}</div>}
      </div>
      <div className={'content'}>
        <Flipper flipKey={count}>
          <ul className={'list'}>
            {data.map(d => (
              <Flipped key={d.id} flipId={d.id} onComplete={()=>console.log('onComplete called')}>
                <li>
                  <div onClick={e => isTheOne(d.id)} className={'shell'}>
                    {d.ball && <img src={Circle} className={'image'} alt={''} />}
                  </div>                
                </li>
              </Flipped>
            ))}
          </ul>
        </Flipper>
      </div>
      <div className={'footer'}>
        <button className={'button'} onClick={start}>Start</button>
        <button className={'button'} onClick={() => {}}>Retry</button>
      </div>
    </div>
  );
};

export default App;