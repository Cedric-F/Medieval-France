import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Marker extends Component {

	render() {
		const { type, name, photo } = this.props;
		/*
		 * Marker's coordinates are at the top left corner of the image.
		 * This style places the marker so it can properly "point" to the location it refers to
		 */

		const center = {
		  position: 'absolute',
		  transform: 'translate(-50%, -100%)'
		}

		return (
			<div style={center} title={name} className="marker" tabIndex="-1">
				<Link to={{pathname: name.replace(/\s/g, '_'), state: {type: type, name: name, photo: photo} }}><img src={require(`../icons/${type === "City" ? "Cities/" + name : type}.png`)} alt={name}/></Link>
			</div>
		)
	}
}

export default Marker;