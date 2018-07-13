import React, { Component } from 'react';
import './App.css';
import MapStyle from './map-style.json';
import Map from './Components/Map';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      map: ''
    };
  }

  componentDidMount() {
    console.log(MapStyle)
  }

  render() {
    return (
      <div className="App">
        <Map style={MapStyle}/>
      </div>
    );
  }
}

export default App;