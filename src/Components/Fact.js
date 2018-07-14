import React, { Component } from 'react';
import {Modal, Button, Image} from 'react-bootstrap';

export default class Fact extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: true,
      results: []
    };
  }

  handleClose() {
    this.setState({ show: false });
    this.props.resetQuery('');
    this.props.history.push('/');
  }

  getWiki(name, type) {
    fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|images&titles=${name.replace(/\s/g, '_')}&exintro=1&imlimit=5`, {
    	mode: 'cors',
    	origin: '*',
    	headers: {
    		'Access-Control-Allow-Origin': 'http://localhost:3000',
    		'Content-Type': 'application/json; charset=utf-8'
    	}
    })
    .then(r => r.json())
    .then(r => {
    	let element = r.query.pages[Object.keys(r.query.pages)[0]];
    	this.setState({results: element.extract})
    })
    .catch(e => console.log(e))
  }

	componentDidMount() {
  	const {name, type} = this.props.data.location.state;
		this.getWiki(name, type);
	}

  render() {
  	const {name, type, photo} = this.props.data.location.state;

    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{type}</h4>
            <p>
            	{<Image src={require(`../images/photos/${photo}`)} responsive />}
            </p>

            <hr />

            <h4>History</h4>
            <p dangerouslySetInnerHTML={{__html: this.state.results}} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}