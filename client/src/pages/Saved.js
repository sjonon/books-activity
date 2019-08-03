import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import {SavedList, SavedResults} from "../components/SavedResults"

class Detail extends Component {
  state = {
    books: []
  };

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
            <SavedList>
              {this.state.books.map((books, index) => {
                return (<SavedResults
                  key={index}
                  id={books._id}
                  title={books.title}
                  author={books.authors}
                  synopsis={books.synopsis}
                  thumbnail={books.image}
                  deleteBook={this.deleteBook}
                />
                );
              })
              }
            </SavedList>
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
