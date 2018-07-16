import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Marker extends Component {

	render() {
		const { type, name, photo, source } = this.props;

		return (
			<div title={name} className="marker">
				<Link to={{pathname: type + '/' + name.replace(/\s/g, '_'), state: {type: type, name: name, photo: photo, source: source} }} tabIndex="-1"><img src={require(`../icons/${type === "City" ? "Cities/" + name : type}.webp`)} alt={name}/></Link>
			</div>
		)
	}
}

export default Marker;