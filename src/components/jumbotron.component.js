import React from 'react';
import { Jumbotron, 
  Container, 
  Row, 
  Col } from 'reactstrap';
import jumping from '../static/jumping.jpg'


const ImageJumbotron = (props) => {
  const inlineCss = {
    backgroundImage:`url(${jumping})`,
    backgroundSize: `cover`
  }
  return (
    <div>
      <Jumbotron fluid style={inlineCss}>
        <Container fluid>
          <Row>
            <Col md={{size:4, offset: 1}}>
            <h1 className="display-3">Dive into language learning</h1>
            <p className="lead">Free resources for students and teachers.</p>
            </Col>

          </Row>
          </Container>
      </Jumbotron>
    </div>
  );
};

export default ImageJumbotron;