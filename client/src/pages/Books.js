import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import SearchForm from "../components/SearchForm";
import {SearchResults, SearchList} from "../components/SearchResults";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
    search: "",
    results: []
  };

  // componentDidMount() {
  //   this.loadBooks();
  // }

  loadBooks = () => {
    API.getBook()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  saveBook = id => {
    API.saveBook({
      title: id,
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

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
        console.log(res.data.items[0].volumeInfo);
        this.setState({ results: res.data.items, error: "" });
        console.log(this.state.results)
      })
      .catch(err => this.setState({ error: err.message }));
  };

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
              {this.state.results.map(results => {
                return (<SearchResults
                  key={results.volumeInfo.title}
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
      </Container>
    );
  }
}

export default Books;
