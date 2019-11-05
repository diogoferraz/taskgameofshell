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
  message: ''
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.numFlipKey = this.numFlipKey.bind(this);
    this.isTheOne = this.isTheOne.bind(this);
    this.onShuffleStart = this.onShuffleStart.bind(this);
    this.onStopShuffle = this.onStopShuffle.bind(this);
    this.hideImage = false;
    this.count = 0;
  }

  numFlipKey = () => Math.floor(Math.random() * 100) + 1;

  isTheOne = (e) => {
    if(!this.startRuning) return;
    const choosen = _.find(this.state.data, item => item.ball === true);
    switch (choosen.id === e) {
      case true:
        this.setState({ message: 'You got it! Congratulations!' });
        this.hideImage = false;
        break;
      default:
        this.setState({ message: 'Swing and a miss! Try again!' });
        break;
    }
  };

  onShuffleStart = () => {
    this.hideImage = true;
    this.startRuning = true;
    this.count = 0;
    this.interval = setInterval(() => {
      this.setState({ data: _.shuffle(this.state.data) });
    }, 500);
  };

  onRetry = () => {
    this.hideImage = false;
    this.startRuning = false;
    const randomBall = Math.floor(Math.random() * 3) + 1;
    const newData = [];

    _.forEach(this.state.data, (item) => {
        if(item.id === randomBall) {
          item.ball = true;
        } else {
          item.ball = false;
        }
        newData.push(item);
    });
    this.setState({data: newData, message: ''});
  }

  onStopShuffle = () => {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className={'wrapper'}>
        <div className={'header'}>
          {this.state.message && <div className={'message'}>{this.state.message}</div>}
        </div>
        <div className={'content'}>
          <Flipper flipKey={this.numFlipKey()}>
            <ul className={'list'}>
              {this.state.data.map(d => (
                <Flipped key={d.id} flipId={d.id}
                  onComplete={() => {
                    this.count = _.add(this.count, 1);
                    this.count >= 20 && this.onStopShuffle();
                  }}>
                  <li key={d.id}>
                    <div key={d.id} onClick={e => this.isTheOne(d.id)} className={'shell'} >
                      {d.ball && <img src={Circle} className={`image ${this.hideImage ? 'hide' : ''}`} alt={''} />}
                    </div>
                  </li>
                </Flipped>
              ))}
            </ul>
          </Flipper>
        </div>
        <div className={'footer'}>
          <button className={`button ${this.startRuning ? 'disabled': ''}`} onClick={this.onShuffleStart} disabled={this.startRuning}>Start</button>
          <button className={'button'} onClick={this.onRetry}>Retry</button>
        </div>
      </div>
    );
  }
};

export default App;