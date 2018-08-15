const soundLiblary = 
  [{
    code: 81,
    drumKey: 'Q',
    name: 'bang',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon034.mp3'
  },
  {
    code: 87,
    drumKey: 'W',
    name: 'shot',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon022.mp3'
  },
  {
    code: 69,
    drumKey: 'E',
    name: 'ricochet',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon016.mp3'
  },
  {
    code: 65,
    drumKey: 'A',
    name: 'spring',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon012.mp3'
  },
  {
    code: 83,
    drumKey: 'S',
    name: 'clang',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon007.mp3'
  },
  {
    code: 68,
    drumKey: 'D',
    name: 'boings',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon006.mp3'
  },
  {
    code: 90,
    drumKey: 'Z',
    name: 'horn2',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon005.mp3'
  },
  {
    code: 88,
    drumKey: 'X',
    name: 'horn1',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon004.mp3'
  },
  {
    code: 67,
    drumKey: 'C',
    name: 'kiss',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon003.mp3'
  }];

const activ = {backgroundColor: '#E1E0FF', boxShadow: 'none'};
const inactiv = {backgroundColor: '#496F99', boxShadow: '3px 3px 5px black'};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      drumKey: '',
      name: '',
      srcSound: '',
      volumeSound: '0.3',
      stylePud: inactiv
    }
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.playSound = this.playSound.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setStyle = this.setStyle.bind(this);
  }
  
  setStyle(element) {
    if (this.state.stylePud === inactiv) {
      this.setState({
        stylePud: activ
      });
    } else {
      this.setState({
        stylePud: inactiv
      });
    }     
  }
  
  playSound() {    
    const myAudio = document.getElementById(this.state.drumKey);
    myAudio.autoplay = true;
    myAudio.load();
    
    this.setStyle(this.state.name);
    setTimeout(() => this.setStyle(this.state.name), 100);
  }
  
  handleMouseDown(event) { 
    event.preventDefault();
    const arrForSet = event.target.value.split(",");
    this.setState({
      drumKey: arrForSet[0],
      name: arrForSet[1],      
      srcSound: arrForSet[2]
    });
  }
  
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }  
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }
  
  handleKeyDown(event) {
    const MaybeSoundKey = event.keyCode;
    const arrForSet = soundLiblary.filter(x => x.code === MaybeSoundKey);
    if (arrForSet) {
      this.setState({
        drumKey: arrForSet[0].drumKey,
        name: arrForSet[0].name,      
        srcSound: arrForSet[0].srcSound
      });
      this.playSound();
    }
  }
  
  handleChange(event) {
    this.setState({
      volumeSound: event.target.value
    });
    
  }
    
  render() {
    
    const aud = document.getElementsByClassName("clip");
    for (let i = 0; i < aud.length; i++) {
      aud[i].volume = this.state.volumeSound;
    }
    
    
    const arrToRender = soundLiblary.map(x => {
      return (
        <button           
          key={x.drumKey} 
          id={x.name} 
          className="drum-pad" 
          style={this.state.stylePud} 
          value={`${x.drumKey},${x.name},${x.srcSound}`} 
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.playSound}>
          <audio id={x.drumKey} className="clip" preload="auto">
            <source src={x.srcSound} type="audio/mpeg" />
          </audio>
          {x.drumKey}
        </button>
      );        
    });
    
    return (
      <div id="drum-machine">        
        <div id="keyBoard">
          {arrToRender}
        </div>
        <div id="controls">
          <Display name={this.state.name} volumeSound={this.state.volumeSound} />
          <div className="slider-wrapper">
            <input id="volumeSound" 
            type="range" 
            value={this.state.volumeSound} 
            min="0" max="1" 
            step="0.01" 
            onChange={this.handleChange} /> 
          </div>          
        </div>
      </div>
    );
  }
}

const Display = (props) => {
  return (
    <div id="display">
      <div> <i>volume: {Math.round(props.volumeSound * 100)}</i></div>
      <hr />
      <div> <i>track: {props.name} </i></div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
