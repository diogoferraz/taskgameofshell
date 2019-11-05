import React, { useState, useEffect, useRef } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import _ from 'lodash';
import './assets/styles.css';
import Circle from './assets/images/circle.svg';
const shells = [
  { id: 1, ball: true },
  { id: 2, ball: false },
  { id: 3, ball: false },
]
const App = () => {
  const numShuffle = () => Math.floor(Math.random() * 9) + 1;
  const image = useRef();
  const [data, setData] = useState(shells);
  const [countShuffle, setCountShuffle] = useState(0);
  const [showMessage, setShowMessage] = useState('');
  let interval;

  const isTheOne = (e) => {
    switch (e) {
      case true:
        setShowMessage('You got it! Congratulations!');
        break;
      default:
        setShowMessage('Swing and a miss! Click on retry to try again!')
        break;
    }
  };

  const shuffleStart = () => {
    interval = setInterval(() => {
      if(countShuffle < 8) setData(_.shuffle(data));
    }, 500);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    shuffleStart();
  }, []);

  return (
    <div className={'wrapper'}>
      <div className={'header'}>
        {showMessage && <div className={'message'}>{showMessage}</div>}
      </div>
      <div className={'content'}>
        <Flipper flipKey={numShuffle()}>
          <ul className={'list'}>
            {data.map(d => (
              <Flipped key={d.id} flipId={d.id} onComplete={() => {}}>
                <li>
                  <div onClick={e => isTheOne(d.id)} className={'shell'}>
                    {d.ball && <img src={Circle} className={'image'} alt={''} ref={image} />}
                  </div>
                </li>
              </Flipped>
            ))}
          </ul>
        </Flipper>
      </div>
      <div className={'footer'}>
        <button className={'button'} onClick={()=>{}}>Start</button>
        <button className={'button'} onClick={() => {}}>Retry</button>
      </div>
    </div>
  );
};

export default App;