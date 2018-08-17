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
const powerOn = {backgroundColor: '#66ff33'};
const powerOff = {backgroundColor: '#000'};
const greating = 'WELCOME!';

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
    if (this.props.power) {
      const myAudio = document.getElementById(this.props.symbol);
      myAudio.currentTyme = 0;
      myAudio.volume = this.props.volumeSound;
      myAudio.play();
      this.handleStyle();
      this.props.changeName(this.props.name);
    }
  }
  handleStyle() {
    this.setState({pudStyle: activ});
    setTimeout(() => this.setState({pudStyle: inactiv}), 100);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }  
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }  
  render() {
    return (
      <div id={this.props.name} code={this.props.code} className="drum-pad" 
        style={this.state.pudStyle} onClick={this.playSound}>
        <audio id={this.props.symbol} className="clip" preload="auto">
          <source src={this.props.srcSound} type="audio/mpeg" />
        </audio>
        {this.props.symbol}
      </div>
    );
  }
}
const KeyBoard = (props) => {  
  const arrToRender = soundLiblary.map(x => 
  <NumPad name={x.name} code={x.code} symbol={x.symbol} srcSound={x.srcSound} 
    volumeSound={props.volumeSound} changeName={props.changeName} power={props.power} />);
  return (
    <div id="keyBoard">
      {arrToRender}
    </div>
  );
}

const Display = (props) => {
  let toDisplay;
  props.infoToDisplay === '' ? toDisplay = '' :  props.infoToDisplay === 
  greating ? toDisplay = props.infoToDisplay : Number(props.infoToDisplay) ? 
  toDisplay = `volume: ${Math.round(props.infoToDisplay * 100)}` : toDisplay = 
  `track: ${props.infoToDisplay}`;
  return (
    <div id="display">
      <div> 
        <i>{toDisplay}</i>
      </div>
    </div>
  );
}

const Power = (props) => {  
  let powerStyle;
  props.power ? powerStyle = powerOn : powerStyle = powerOff;
  return (
    <div id="power" onClick={props.handlePower} style={powerStyle} /> 
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volumeSound: '0.3',
      infoToDisplay: greating,
      power: true
    }
    this.handleChangeVolume = this.handleChangeVolume.bind(this);
    this.changeName = this.changeName.bind(this);
    this.handlePower = this.handlePower.bind(this);
  }
  handleChangeVolume(event) {
    if (this.state.power) {
      this.setState({
        volumeSound: event.target.value, 
        infoToDisplay: event.target.value
      });
      setTimeout(() => this.setState({infoToDisplay: ''}), 1500);
    }
  }
  changeName(value) {
    this.setState({name: value, infoToDisplay: value});
  }
  handlePower() {
    this.setState({power: !this.state.power}, () => this.state.power ? 
    this.setState({infoToDisplay: greating}) : 
    this.setState({infoToDisplay: ''}));    
  }
  render() {
    return (
      <div id="drum-machine">
        <KeyBoard volumeSound={this.state.volumeSound} changeName={this.changeName} 
          power={this.state.power} />
        <div id="controls">          
          <Display infoToDisplay={this.state.infoToDisplay} />
          <div className="slider-wrapper">
              <input id="volumeSound" 
              type="range" 
              value={this.state.volumeSound} 
              min="0" max="1" 
              step="0.01" 
              onChange={this.handleChangeVolume} /> 
            </div> 
          </div>
        <Power handlePower={this.handlePower} power={this.state.power} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
