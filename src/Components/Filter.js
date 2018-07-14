import React, { Component } from 'react';
import List from './List';

export default class Filter extends Component {

	/*
	 * Renders the 3 categories and their respective content.
	 */

	renderLists(locations) {
		let lists = [];
		for (let l in locations)
			lists.push(<List isClicked={this.props.isClicked} query={this.props.query} filter={this.props.filter} key={l} type={l} set={locations[l]}/>)
		return lists;
	}

	render() {

    const { locations, query, filter, isOpen } = this.props;

		return (
			<div className={`side-wrap ${isOpen ? 'open' : 'close'}`}>
				<div className="side-panel">
					<label htmlFor="search" style={{display: 'none'}}>Search</label>
					{/*
					  * The input field receives the App's "handleQuery" method passed down as a the "query" prop.
					  * On change, update the App's state with the new query so it can render the corresponding elements only.
					  */}
					<input aria-label="Start typing your research." tabIndex="1" id="search" onChange={(e) => query(e.target.value, false)} type="text" maxLength={30} className="search-input" />
					{
						this.renderLists(locations)
					}
					<a style={{fontSize: 0}} href='#search' aria-label="Back to the top.">Back to the top.</a>
				</div>
			</div>
		)
	}
}