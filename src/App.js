import React, { Component } from 'react';
// import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import MapStyle from './map-style.json'; // A home-made "paper" map style to fit in the "medieval" theme.
/*
 * A list of places to render in the application.
 * It consists of an array of 3 categories (Cities, Cathedrals, Castles) and a total of 39 locations.
 */
import locations from './locations.json';
import Map from './Components/Map';
import Filter from './Components/Filter';
import Fact from './Components/Fact';

import { Route } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      isClicked: false
    };
  }

  componentDidMount() {
    console.log(MapStyle)
  }

  handleQuery(e, isClicked) {
    console.log(e, isClicked)
    // TODO! isClicked keeps the list view items visible when clicking on one of them.
    this.setState({query: e, isClicked: isClicked})
  }

  render() {
    console.log(this.state)
    return (
      <div className="app">
        <Route exact path='/:Place' render={({location, history}) => <Fact history={history} location={{location}} />}/>
          {/*
                   * Filter is the Side Panel container the search input field and the list view.
                   * We pass the handleQuery method as a prop so it can update the app state with the query value
                   * and then pass this value to both the list-view AND the map
                   * so it can render the corresponding list items and markers
                   */}
        <Filter filter={this.state.query} isClicked={this.state.isClicked} query={this.handleQuery.bind(this)} locations={locations}/>
          {/*
                   * Holds the Google Map, provided by google-map-react package.
                   * Pass down the query value, map style and location list to it.
                   */}
        <Map filter={this.state.query} isClicked={this.state.isClicked} style={MapStyle} locations={locations}/>
      </div>
    );
  }
}

export default App;