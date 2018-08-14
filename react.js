const arr = [
  {
    drumKey: 'Q',
    name: 'bang',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon034.mp3'
  },
  {
    drumKey: 'W',
    name: 'shot',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon022.mp3'
  },
  {
    drumKey: 'E',
    name: 'ricochet',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon016.mp3'
  },
  {
    drumKey: 'A',
    name: 'spring',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon012.mp3'
  },
  {
    drumKey: 'S',
    name: 'clang',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon007.mp3'
  },
  {
    drumKey: 'D',
    name: 'boings',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon006.mp3'
  },
  {
    drumKey: 'Z',
    name: 'horn2',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon005.mp3'
  },
  {
    drumKey: 'X',
    name: 'horn1',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon004.mp3'
  },
  {
    drumKey: 'C',
    name: 'kiss',
    srcSound: 'http://static1.grsites.com/archive/sounds/cartoon/cartoon003.mp3'
  }
];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      drumKey: '',
      name: '',
      srcSound: ''
    }
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  handleMouseUp(event) { 
    event.preventDefault();
    let arr1 = event.target.value.split(",");
    console.log(event.target.value);
    this.setState({
      drumKey: arr1[0],
      name: arr1[1],      
      srcSound: arr1[2]
    })
    let myAudio = document.getElementById(event.target.value[0]);
    myAudio.autoplay = true;
    myAudio.load();
  }
  handleKeyUp(e) {
    e.preventDefault();
    console.log(e.target.value);
  }
  
  render() {
    const arrToRender = arr.map(x => {
      return (
        <button key={x.drumKey} className="drum-pad" onMouseUp={this.handleMouseUp} value={`${x.drumKey},${x.name},${x.srcSound}`} >
          <audio id={x.drumKey} className="clip">
            <source src={x.srcSound} type="audio/mpeg" />
          </audio>
          {x.drumKey}
        </button>
      )
        
    });
    return (
      <div id="drum-machine">
        <div id="keyBoard">
        {arrToRender}
        </div>
        <Display name={this.state.name} />
      </div>
    );
  }
}

const Display = (props) => {
  return (
    <div id="display">
      {props.name}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
