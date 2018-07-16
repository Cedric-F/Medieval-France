import React, { Component } from 'react';
import {Modal, Button, Image, Tooltip, OverlayTrigger} from 'react-bootstrap';

export default class Fact extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: true,
      results: []
    };
  }

  /*
   * When closing the Modal, reset the query to display back the whole list view, and route back to the "home page"
   */
  handleClose() {
    this.setState({ show: false });
    this.props.resetQuery('');
    this.props.history.push(`${process.env.PUBLIC_URL}/`);
  }

  getWiki(name, type) {

    /*
     * If the text is stored, no need to fetch it from Wikipedia again.
     * Improves network performance and offline experience.
     */
    if (typeof(Storage) && localStorage[name + ' text']) {
      this.setState({results: localStorage[name + ' text']});
      return;
    }

    /*
     * Send a request to the Wikipedia api.
     * The "extract" prop means that we're grabbing the article content.
     * "exintro = 1" refers to the 1st section of the wikipedia article.
     * When the article is found, store it locally for later use and render the modal.
     */
    fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&titles=${name.replace(/\s/g, '_')}&exintro=1`, {
      headers: {
        'Origin': 'https://cedric-f.github.io/',
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .then(r => r.json())
    .then(r => {
      let element = r.query.pages[Object.keys(r.query.pages)[0]];
      /*
       * cache the text for later (offline ?) use.
       */
      localStorage.setItem(name + ' text', element.extract);
      this.setState({results: element.extract});
    })
    .catch(e => {console.error(e, localStorage[name + ' text']); this.setState({results: 'Sorry! An error occured and we couldn\'t get the request results. Please check your network and try again.<br/>' + e})})
  }

  /*
   * Once the component is mounted, get the data to render.
   */
  componentDidMount() {
    const { name, type } = this.props.data.location.state;
    this.getWiki(name, type);
  }

  render() {
    const { name, type, photo, source } = this.props.data.location.state;
    const tooltip = (
      <Tooltip id="modal-tooltip" tabIndex="0">{source ? `Wikipedia and ${source}` : 'Wikipedia'}</Tooltip>
    );

    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{type}</h4>
            <p>
              <Image src={require(`../images/photos/${photo}`)} alt={`A photo of ${name}`} tabIndex="0" responsive />
              <OverlayTrigger overlay={tooltip}>
                <a href={`https://en.wikipedia.org/wiki/${name}`} target='_blank'>Sources</a>
              </OverlayTrigger>
            </p>

            <hr />

            <h4 tabIndex="0">History</h4>
            {
              /*
               * The wikipedia article is returned as a raw text,
               * So we use this method to parse the html tags.
               */
            }
            <p dangerouslySetInnerHTML={{__html: this.state.results}} tabIndex="0" />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} name="Close" aria-label="Close the Info Window">Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}