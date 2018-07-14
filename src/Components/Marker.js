import React, { Component } from 'react';

class Marker extends Component {

	render() {
		const { type, name } = this.props;
		/*
		 * Marker's coordinates are at the top left corner of the image.
		 * This style places the marker so it can properly "point" to the location it refers to
		 */

		const center = {
		  position: 'absolute',
		  transform: 'translate(-50%, -100%)'
		}

		return (
			<div style={center} title={name} className="marker">
				<img src={require(`../icons/${type === "Cities" ? "Cities/" + name : type}.png`)} alt={name}/>
			</div>
		)
	}
}

export default Marker;