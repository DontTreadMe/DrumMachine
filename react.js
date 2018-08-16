const soundLiblary = 
  [{
   code: 81,
   symbol: 'Q',
   name: 'bang',
   srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon034.mp3'
 }, {
   code: 87,
   symbol: 'W',
   name: 'shot',
   srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon022.mp3'
 }, {
   code: 69,
   symbol: 'E',
   name: 'ricochet',
   srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon016.mp3'
 }, {
   code: 65,
   symbol: 'A',
   name: 'spring',
   srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon012.mp3'
 }, {
   code: 83,
   symbol: 'S',
   name: 'clang',
   srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon007.mp3'
 }, {
   code: 68,
   symbol: 'D',
   name: 'boings',
   srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon006.mp3'
 }, {
   code: 90,
   symbol: 'Z',
   name: 'horn2',
   srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon005.mp3'
 }, {
   code: 88,
   symbol: 'X',
   name: 'horn1',
   srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon004.mp3'
 }, {
   code: 67,
   symbol: 'C',
   name: 'kiss',
   srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon003.mp3'
 }];

const activ = {backgroundColor: '#E1E0FF', boxShadow: 'none'};
const inactiv = {backgroundColor: '#496F99', boxShadow: '3px 3px 5px black'};

class NumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pudStyle: inactiv
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.playSound = this.playSound.bind(this);
    this.handleStyle = this.handleStyle.bind(this);
  }
  handleKeyDown(event) {
    if (event.keyCode === this.props.code) {
      this.playSound();
    }
  }
  playSound() {
    const myAudio = document.getElementById(this.props.symbol);
    myAudio.currentTyme = 0;
    myAudio.play();
    this.handleStyle();
  }
  handleStyle() {
    this.setState({pudStyle: activ});
    setTimeout(() => this.setState({pudStyle: inactiv}), 100); //---NB---
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }  
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }
  render() {
    return (
      <div id={this.props.name} code={this.props.code} className="drum-pad" style={this.state.pudStyle} onClick={this.playSound}>
        <audio id={this.props.symbol} className="clip" preload="auto">
          <source src={this.props.srcSound} type="audio/mpeg" preload="auto" />
        </audio>
        {this.props.symbol}
      </div>
    );
  }
}
class KeyBoard extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const arrToRender = soundLiblary.map(x => 
    <NumPad name={x.name} code={x.code} symbol={x.symbol} srcSound={x.srcSound} />
    );
    return (
      <div id="keyBoard">
        {arrToRender}
      </div>
    );
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      volumeSound: '0.3'
    }
  }
  render() {
    return (
      <div id="drum-machine">
        <KeyBoard />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
