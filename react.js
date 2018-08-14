const arr = [
  {
    drumKey: 'Q',
    name: 'bang',
    sound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon034.mp3'
  },
  {
    drumKey: 'W',
    name: 'shot',
    sound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon022.mp3'
  },
  {
    drumKey: 'E',
    name: 'ricochet',
    sound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon016.mp3'
  },
  {
    drumKey: 'A',
    name: 'spring',
    sound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon012.mp3'
  },
  {
    drumKey: 'S',
    name: 'clang',
    sound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon007.mp3'
  },
  {
    drumKey: 'D',
    name: 'boings',
    sound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon006.mp3'
  },
  {
    drumKey: 'Z',
    name: 'horn2',
    sound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon005.mp3'
  },
  {
    drumKey: 'X',
    name: 'horn1',
    sound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon004.mp3'
  },
  {
    drumKey: 'C',
    name: 'kiss',
    sound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon003.mp3'
  }
];
class App extends React.Component {
  constructor(props) {
    super(props);
    /*this.state = {
      keyUp: ''
    }*/
  }
  render() {
    const arrToRender = arr.map(x => <MyKey key={x.name} sound={x.sound} drumKey={x.drumKey} />);
    return (
      <div id="drum-machine">
        <div id="keyBoard">
        {arrToRender}
        </div>
      </div>
    );
  }
}

class MyKey extends React.Component {
  constructor(props) {
    super(props);
    this.handleUp = this.handleUp.bind(this);
  }
  handleUp() {
    let myAudio = document.getElementById(this.props.drumKey);
    myAudio.autoplay = true;
    myAudio.load();
  }
  render() {
    return (
      <div className="drum-pad" onMouseUp={this.handleUp}>
        <audio id={this.props.drumKey}>
          <source src={this.props.sound} type="audio/mpeg" />
        </audio>
        {this.props.drumKey}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
