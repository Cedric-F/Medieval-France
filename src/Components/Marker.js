import React, { Component } from 'react';

class Marker extends Component {

	render() {
		const { type, name } = this.props;
		const center = {
		  position: 'absolute',
		  transform: 'translate(-50%, -100%)'
		}

		return (<div style={center}><img src={require(`../icons/${type === "Cities" ? "Cities/" + name : type}.png`)} /></div>)
	}
}

export default Marker;