import React, { Component } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import _ from 'lodash';
import './assets/styles.scss';
import Circle from './assets/images/circle.svg';

const initialState = {
  data: [
    { id: 1, ball: true },
    { id: 2, ball: false },
    { id: 3, ball: false }
  ],
  message: { text: 'Take a close look where the black ball is, after it click on Start!', type: 'info' },
  overlay: false,
  hideImage: false,
  startRunning: false,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.numFlipKey = this.numFlipKey.bind(this);
    this.isTheOne = this.isTheOne.bind(this);
    this.onShuffleStart = this.onShuffleStart.bind(this);
    this.onShuffleStop = this.onShuffleStop.bind(this);
    this.count = 0;
  }

  numFlipKey = () => Math.floor(Math.random() * 100) + 1;

  isTheOne = (e) => {
    if (!this.state.startRunning) return;
    const choosen = _.find(this.state.data, item => item.ball === true);
    switch (choosen.id === e) {
      case true:
        this.setState({ message: { text: 'You got it! Congratulations!', type: 'success' }, hideImage: false });
        break;
      default:
        this.setState({ message: { text: 'Swing and a miss! Try again!', type: 'error' } });
        break;
    }
  };

  onShuffleStart = () => {
    this.count = 0;
    this.interval = setInterval(() => {
      this.setState({ data: _.shuffle(this.state.data), overlay: true, message: { text: 'Shuffling...', type: 'info' }, hideImage: true, startRunning: true });
    }, 500);
  };

  onRetry = () => {
    const randomBall = Math.floor(Math.random() * 3) + 1;
    const newData = [];

    _.forEach(this.state.data, (item) => {
      if (item.id === randomBall) {
        item.ball = true;
      } else {
        item.ball = false;
      }
      newData.push(item);
    });

    this.setState({ data: newData, message: { text: 'Take a close look where the black ball is, after it click on Start!', type: 'info' }, overlay: true, hideImage: false, startRunning: false });
  }

  onShuffleStop = () => {
    clearInterval(this.interval);
    this.interval = undefined;
    this.setState({ overlay: false, message: { text: 'Click on the rectangle which hides the black ball', type: 'info' } });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { message, overlay, data, hideImage, startRunning } = this.state;
    return (
      <div className={'wrapper'}>
        <div className={'header'}>
          {message.text && <div className={`message ${message.type}`}><p>{message.text}</p></div>}
        </div>
        <div className={'content'}>
          {overlay && <div className={'overlay'} onClick={(e) => console.log(e)} />}
          <Flipper flipKey={this.numFlipKey()}>
            <ul className={'list'}>
              {data.map(d => (
                <Flipped key={d.id} flipId={d.id}
                  onComplete={() => {
                    this.count = _.add(this.count, 1);
                    if (this.count === 20) this.onShuffleStop();
                  }}>
                  <li key={d.id}>
                    <div key={d.id} onClick={e => this.isTheOne(d.id)} className={'shell'} >
                      {d.ball && <img src={Circle} className={`image ${hideImage ? 'hide' : ''}`} alt={''} />}
                    </div>
                  </li>
                </Flipped>
              ))}
            </ul>
          </Flipper>
        </div>
        <div className={'footer'}>
          <button className={`button ${startRunning ? 'disabled' : ''}`} onClick={this.onShuffleStart} disabled={startRunning}>Start</button>
          <button className={'button'} onClick={this.onRetry}>Restart</button>
        </div>
      </div>
    );
  }
};

export default App;