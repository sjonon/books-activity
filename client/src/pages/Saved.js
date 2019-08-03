import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import {SearchList, SearchResults} from "../components/SearchResults"

class Detail extends Component {
  state = {
    books: []
  };
  // Add code to get the book with an _id equal to the id in the route param
  // e.g. http://localhost:3000/books/:id
  // The book id for this route can be accessed using this.props.match.params.id

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.savedBook()
      .then(res => {
        console.log(res.data)
        this.setState({ books: res.data })
      })
  }

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                My Saved Books
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <SearchList>
              {this.state.books.map((books, index) => {
                return (<SearchResults
                  key={index}
                  title={books.title}
                  author={books.authors}
                  synopsis={books.synopsis}
                  thumbnail={books.image}
                  deleteBook={this.deleteBook}
                />
                );
              })
              }
            </SearchList>
          </Col>
        </Row>
      <Row>
        <Col size="md-2">
          <Link to="/">← Back to Search</Link>
        </Col>
      </Row>
      </Container >

    );
  }
}

export default Detail;
