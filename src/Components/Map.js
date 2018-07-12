import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

export default class Map extends Component {
	static defaultProps = {
    center: {
      lat: 48.8566,
      lng: 2.3522
    },
    zoom: 8
  };

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

  render() {
  	return (
  		<div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
          	key: 'AIzaSyDHQmuUZanQp42dV8KlcM_pcUx2jv0Nw4I',
          	languages: ['en', 'fr', 'ar'],
          	libraries:'places'
          }}
          options={this.mapOptions.bind(this)}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        />
      </div>
  	);
  }
}