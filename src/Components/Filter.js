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

    const { locations, query, toggled } = this.props;

    return (
      <aside className={`side-wrap ${toggled && 'toggle'}`}>
        <div className="side-panel">
          <h1>List view</h1>
          <label htmlFor="search" className="input-label" tabIndex="0">Search</label>
          {/*
            * The input field receives the App's "handleQuery" method passed down as a the "query" prop.
            * On change, update the App's state with the new query so it can render the corresponding elements only.
            */}
          <input aria-label="Start typing your research." placeholder="Search by name..." tabIndex="1" id="search" onChange={(e) => query(e.target.value, false)} type="text" maxLength={30} className="search-input" />
          {
            this.renderLists(locations)
          }
          <a className="back-to-top" href='#search' aria-label="Back to the top.">Back to the top.</a>
        </div>
      </aside>
    )
  }
}
