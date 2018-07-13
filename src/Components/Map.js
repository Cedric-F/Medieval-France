import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'
import locations from '../locations.json'

export default class Map extends Component {
	static defaultProps = {
    center: {
      lat: 48,
      lng: 2.3522
    },
    zoom: 8,
    mapTypeId: 'terrain'

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

  markers() {
    let list = [];
    for (let l in locations) {
      locations[l].forEach((e, i) =>
        list.push(<Marker key={e.name + '-' + i} type={l} name={e.name} lat={e.coordinates.lat} lng={e.coordinates.lng}/>)
      )
    }
    return list
  }

  render() {
  	console.log(locations)
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDHQmuUZanQp42dV8KlcM_pcUx2jv0Nw4I',
            languages: ['en', 'fr'],
            libraries:'places'
          }}
          options={this.mapOptions.bind(this)}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        {
          this.markers().map(e => e)
        }

        </GoogleMapReact>
      </div>
  	);
  }
}