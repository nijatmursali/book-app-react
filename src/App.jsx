import React, { useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import $ from 'jquery'; 
import axios from "axios";
import {
  Container,
  Col,
  Row,
  Button,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import Books from "./Components/Books.jsx";
import Pagination from './Components/Pagination';

function App() {

  //add states here
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  var [postsPerPage, setpostsPerPage] = useState();
  
  const handleChange = async (e) => {
    setLoading(true);
    // change qury state
    setQuery(e.target.value);

    await axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((res) => {
        console.log("Data from API", res.data);
        setCards(res.data.items);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        console.log(err);
      });

  }

  var [indexOfLastPoint, setindexOfLastPoint] = useState();
  var [indexofFirstPost, setindexofFirstPost] = useState();
  var [currentPosts, setcurrentPosts] = useState([]);


  //add posts per page here 
  const handleInputChange = (e) => {
    setpostsPerPage(e);
    setindexOfLastPoint(currentPage * e);
    setindexofFirstPost((currentPage * e) - e);
  }


  // const indexOfLastPost = currentPage * (e);
  // const indexOfFirstPost = indexOfLastPost - (e);
  currentPosts = cards.slice(indexofFirstPost, indexOfLastPoint);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const mainHeader = () => {
    return (
      <div className="App simple-app">
        <Container>
          <Row>
            <Col></Col>
            <Col className="col-6 text-center">
              <h1 className="app">Simple Book App</h1>

              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Enter book name"
                  aria-label="Enter book name"
                  aria-describedby="basic-addon2"
                  value={query}
                  onChange={(e) => handleChange(e)}
                />
                <InputGroup.Append>
                <select className="form-control" name="pagNumber" onChange={(e) => handleInputChange(e.target.value)}>
                    <option value ="5">5</option>
                    <option selected value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
                </InputGroup.Append>
              </InputGroup>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  };

  const handleCards = () => {
    
    
    const items = (<div className="col-12 mb-3">
        <Books posts={currentPosts}/>

        {/* pagination */}
        <Container>
          <Row>
            <Col className="d-flex justify-content-center">
                <Pagination postsPerPage={postsPerPage}
                totalPosts={cards.length}
                paginate={paginate}
                />
            </Col>
          </Row>
        </Container>
    
    </div>);
     
    return (
      <div className='container my-5'>
        <div className='row'>{items}</div>
      </div>
    );
  };

  return (
    <div>
      {mainHeader()}
      {loading ?<div className="container text-center mt-5" >Loading...</div> :  handleCards()}
      </div>
  );
}

export default App;

