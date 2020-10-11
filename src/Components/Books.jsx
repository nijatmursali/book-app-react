import React, { useState } from "react";
import ReactDom from "react-dom";
import Popup from "react-popup";
import { Popover, OverlayTrigger, Button, Card, Modal } from "react-bootstrap";
const Books = ({ posts }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function sayHello(name) {
    //alert(`hello, ${name}`);
    setShow(name);
  }


  function truncate(str) {
    if (str !== undefined) {
      return str.length > 10 ? str.substring(0, 180) + "..." : str;
    } else {
    }
  }

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="card mb-3"
          style={{ maxWidth: 1200, maxHeight: 200 }}
        >
          <div className="row">
            <div className="col-md-4">
              <img
                className="card-img"
                src={post.volumeInfo.imageLinks.thumbnail}
                style={{ maxHeight: 200 }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h4 className="card-title">{post.volumeInfo.title}</h4>
                <p className="card-text">
                  {truncate(post.volumeInfo.description)}
                </p>

                <Card.Body>
                  <Button className="btn btn-primary" onClick={() => sayHello(post.id)}>
                    View 
                  </Button>
                </Card.Body>

                <Modal show={show==post.id} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{post.volumeInfo.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {post.volumeInfo.description}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Books;

