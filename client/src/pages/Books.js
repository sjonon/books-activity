import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import SearchForm from "../components/SearchForm";
import {SearchResults, SearchList} from "../components/SearchResults";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Link } from "react-router-dom";


class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
    search: "",
    results: []
  };

  loadBooks = () => {
    API.getBooks()
      .then(res => {
        console.log(res.data)
        this.setState({ books: res.data })
      })
  }

  saveBook = data => {
    API.saveBook(data)
    .then(res => this.loadBooks())
    .catch(err => console.log(err));
  }

  handleInputChangeSearch = event => {
    console.log(event.target.value);
    this.setState({ search: event.target.value });
    console.log("this.state.search", this.state.search)
  };

  handleFormSubmitSearch = event => {
    event.preventDefault();
    API.getBooks(this.state.search)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        console.log(res.data.items);
        this.setState({ results: res.data.items, error: "" });
        console.log(this.state.results)
      })
      .catch(err => this.setState({ error: err.message }));
  };

  // thumbnailImage = () =>{
  //   console.log(this.state.results.volumeInfo.imageLinks.thumbnail)
  //   if(!this.state.results.volumeInfo.imageLinks.thumbnail){
  //     return "https://via.placeholder.com/150"
  //   }
  //   else {
  //     return this.state.results.volumeInfo.imageLinks.thumbnail
  //   }
  // }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-6">
            <SearchForm
              handleFormSubmitSearch={this.handleFormSubmitSearch}
              handleInputChangeSearch={this.handleInputChangeSearch}
            />
          </Col>
          <Col size="md-6">
            <SearchList>
              {this.state.results.map((results , index) => {
                return (<SearchResults
                  key={index}
                  id={results.id}
                  title={results.volumeInfo.title}
                  author={results.volumeInfo.authors}
                  link={results.volumeInfo.infoLink}
                  synopsis={results.volumeInfo.description}
                  thumbnail={results.volumeInfo.imageLinks.thumbnail}
                  saveBook={this.saveBook}
                />
                );
              })
              }
            </SearchList>
          </Col>
        </Row>
        <Row>
        <Col size="md-2">
          <Link to="/saved">My Saved Books</Link>
        </Col>
      </Row>
      </Container>
    );
  }
}

export default Books;
