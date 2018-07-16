import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class List extends Component {

	handleClick(e) {
		this.props.query(e.target.textContent, true);
	}

	render() {

    const { type, set, filter, isClicked } = this.props;

		return (
			<div>
				<div className="list-view-title" tabIndex="0" aria-label={`List of ${type}s.`}>
					<img src={require(`../icons/${type}.webp`)} alt={type + ' logo'}/>
					<h1>{type}</h1>
				</div>
				<ul className="list-view">
					{
						/*
						 * Loop over the category's locations and for each, only display those whose name matches the query value.
						 * Testing a string against an empty string will always be truthy, so all the markers are displayed by default.
						 * isClicked is true only when clicking on a list-view item.
						 * When isClicked is true, hide all markers except the clicked location, but keep all list-items available
						 * so the user can choose another location.
						 */
						set.map(e =>
							new RegExp(!isClicked ? filter : '', 'ig').test(e.name) &&

								<li key={e.name} onClick={this.handleClick.bind(this)} className="list-view-item"><Link to={{pathname: process.env.PUBLIC_URL + '/' + e.type + '/' + e.name.replace(/\s/g, '_'), state: {type: e.type, name: e.name, photo: e.thumbnail, source: e.source}}}>{e.name}</Link></li>

						)
					}
				</ul>
			</div>
		)
	}
}