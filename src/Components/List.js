import React, { Component } from 'react';

export default class List extends Component {

	render() {

    const { type, set, filter, query, isClicked } = this.props;
    console.log(isClicked)

		return (
			<div>
				<h1 className="list-view-title" tabIndex="0">
					{/* Gives a legend icon to the categories titles */}
					<img src={require(`../icons/${type}.png`)} alt={type + ' logo'}/>
					<span>{type}</span>
				</h1>
				<ul className="list-view">
					{
						/*
						 * Loop over the category's locations and for each, and only display those whose name matches the query value.
						 * An empty query is truthy, so by all the markers are displayed by default.
						 * isClicked is true only when clicking on a list-view item.
						 * When isClicked is true, hide all markers except the clicked location, but keep all list-items available
						 * so the user can choose another location.
						 */
						set.map(e =>
							new RegExp(!isClicked ? filter : '', 'i').test(e.name) && <li tabIndex="0" onClick={(e) => query(e.target.textContent, true)} key={e.name} className="list-view-item">{e.name}</li>)
					}
				</ul>
			</div>
		)
	}
}