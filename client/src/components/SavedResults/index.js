import React from "react";
import "./style.css";
import { Col, Row, Container } from "../Grid";
import Thumbnail from "../Thumbnail"

export function SavedList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

export function SavedResults(props) {
  return (

  <li className="list-group-item">
  <Container>
    <Row>
      <Col size="xs-4 sm-2">
        <Thumbnail src={props.thumbnail} />
      </Col>
      <Col size="xs-8 sm-9">
        <h3>{props.title}</h3>
        <h5>Author: {props.author}</h5>
        <p>Synopsis: {props.synopsis}</p>
        <button onClick={() => props.deleteBook(props.id)}>Remove from List</button>
      </Col>
    </Row>
  </Container>
  </li>
  )
}

