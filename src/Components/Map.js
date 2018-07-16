import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Glyphicon, Button } from 'react-bootstrap';
import Marker from './Marker';

export default class Map extends Component {

	static defaultProps = {
    center: {
      lat: 48,
      lng: 2.3522
    },
    zoom: 5,
    mapTypeId: 'terrain'
  };

  /*
   * toggles some map options.
   * Most important one is the custom style.
   */
  mapOptions() {
  	return {
  		scrollwheel: true,
  		mapTypeControl: true,
	    mapTypeControlOptions: {
	      mapTypeIds: ['terrain']
	    },
  		styles: this.props.style
  	}
  }

  /*
   * Loop over the locations and renders a Marker component for each one, with the corresponding category and coordinates.
   */
  markers(locations) {
    let list = [];
    for (let l in locations) {
      locations[l].forEach((e, i) =>
        list.push(<Marker key={e.name + '-' + i} type={l} source={e.source} name={e.name} photo={e.thumbnail} lat={e.coordinates.lat} lng={e.coordinates.lng}/>)
      )
    }
    return list
  }

  render() {
    const { locations, filter, onToggle } = this.props;
    return (
      <main className="map" tabIndex="-1" role="application">
        <Button tabIndex="0" name="Toggle" aria-label="Toggle Side Panel" className="toggle-btn" onClick={onToggle}>
          <Glyphicon glyph="menu-hamburger" />
        </Button>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDHQmuUZanQp42dV8KlcM_pcUx2jv0Nw4I', // Enable the Google Maps API
            languages: ['en', 'fr'],
            libraries:'places'
          }}
          options={this.mapOptions.bind(this)}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        {
          /*
           * Renders the markers whose names match the query value.
           * An empty query test relates to true so all the markers are rendered by default.
           */
          this.markers(locations).map(e => new RegExp(filter, 'i').test(e.props.name) && e)
        }

        </GoogleMapReact>
      </main>
  	);
  }
}