import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class Fact extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: true
    };
  }

  handleClose() {
    this.setState({ show: false });
    this.props.resetQuery('');
    this.props.history.push('/');
  }

  render() {
    const { type, name } = this.props.location.location.state;
    console.log(type, name)

    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{type}</h4>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>

            <hr />

            <h4>History</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Nesciunt itaque nemo dolorem veritatis numquam distinctio consequuntur quidem, ex magni, eligendi!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Libero rerum a molestiae repudiandae error hic minima sint, doloribus nihil dolor eligendi
              est sunt perferendis excepturi ad eius neque impedit consequatur optio quos eaque beatae
              laudantium ratione aspernatur sequi. Consectetur, voluptatum.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}