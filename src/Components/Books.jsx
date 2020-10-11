import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import "../scss/main.scss";

const Books = ({ posts }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function sayHello(name) {
    setShow(name);
  }

  function truncateDesd(str) {
    if (str !== undefined) {
      return str.length > 10 ? str.substring(0, 180) + "..." : str;
    } else {
    }
  }

  function truncateTitle(str) {
    if (str !== undefined) {
      return str.length > 10 ? str.substring(0, 50) : str;
    } else {
    }
  }

  function checkIfImageExists(img) {
    if (img.volumeInfo.hasOwnProperty("imageLinks")) {
      console.log("TRUE");
      return true;
    } else {
      console.log("FALSE");
      return false;
    }
  }

  return (
    <>
      {posts.map((post) => (
        <div className="mt-4 container">
          <div
            key={post.id}
            className="card mb-3"
            style={{ maxWidth: 1200, maxHeight: 250 }}
          >
            <div className="row">
              <div className="col-md-4 col-sm-12 mb-4">
                <img
                  className="card-img"
                  src={
                    checkIfImageExists(post)
                      ? post.volumeInfo.imageLinks.thumbnail
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                  }
                  style={{ maxHeight: 200 }}
                />
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="card-body">
                  <h4 className="card-title">
                    {truncateTitle(post.volumeInfo.title)}
                  </h4>
                  <p className="card-text">
                    {truncateDesd(post.volumeInfo.description)}
                  </p>
                </div>
                <div style={{ position: "absolute", bottom: 0 }}>
                  <Card.Body>
                    <Button
                      className="btn btn-primary"
                      onClick={() => sayHello(post.id)}
                    >
                      View
                    </Button>
                  </Card.Body>
                </div>

                <Modal show={show == post.id} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{post.volumeInfo.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h3>Description</h3>
                    <p>{post.volumeInfo.description}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                      Close
                    </Button>
                    <a
                      className="btn btn-primary"
                      href={post.volumeInfo.infoLink}
                      variant="secondary"
                      target="_blank"
                    >
                      Link to book
                    </a>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Books;
