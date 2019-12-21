import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import '../assets/styles.scss';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Content from '../components/Content';

const initialState = {
  data: [
    { id: 1, ball: true },
    { id: 2, ball: false },
    { id: 3, ball: false }
  ],
  overlay: false,
  hideImage: false,
  startRunning: false,
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.count = 0;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { overlay, data, hideImage, startRunning } = this.state;
    const { text, type } = this.props.message;
    return (
      <div className={'wrapper'}>
        <Header message={{text, type}} />
        <Content overlay={overlay} data={data} onCompleteShuffle={this.onCompleteShuffle} hideImage={hideImage} onClickShell={this.onClickShell} />
        <Footer startRunning={startRunning} onShuffleStart={this.onShuffleStart} onRetry={this.onRetry} />
      </div>
    );
  }

  onClickShell = (e) => {
    if (!this.state.startRunning) return;
    const choosen = _.find(this.state.data, item => item.ball === true);
    switch (choosen.id === e) {
      case true:
        this.props.dispatch({type: 'SET_MESSAGE', payload: {text: 'You got it! Congratulations!', type: 'success'}});
        this.setState({ hideImage: false });
        break;
      default:
          this.props.dispatch({type: 'SET_MESSAGE', payload: {text: 'Swing and a miss! Try again!', type: 'error'}});
        break;
    }
  };

  onShuffleStart = () => {
    this.count = 0;
    this.interval = setInterval(() => {
      this.setState({ data: _.shuffle(this.state.data), overlay: true, hideImage: true, startRunning: true });
      this.props.dispatch({type: 'SET_MESSAGE', payload: { text: 'Shuffling...', type: 'info' }});
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

    this.setState({ data: newData, overlay: true, hideImage: false, startRunning: false });
    this.props.dispatch({type: 'SET_MESSAGE', payload: { text: 'Take a close look where the black ball is, after it click on Start!', type: 'info' }});
  }

  onShuffleStop = () => {
    clearInterval(this.interval);
    this.interval = undefined;
    this.setState({ overlay: false});
    this.props.dispatch({type: 'SET_MESSAGE', payload: { text: 'Click on the rectangle which hides the black ball', type: 'info' } });
  }

  onCompleteShuffle = () => {
    this.count = _.add(this.count, 1);
    if (this.count === 20) this.onShuffleStop();
  }
};

const mapStateToProps = (state) => {
  console.log('state', state)
  return ({
    message: state.messageReducer
  })
};

export default connect(mapStateToProps)(App);