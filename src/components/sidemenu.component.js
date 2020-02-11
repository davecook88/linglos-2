import React from 'react';
import {
    Row,
    Col,
    Container,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Sidemenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"Dave",
            points:0
        }
    }
    render() {
        return(
            <Container>
                <Row>
                    <Col xs='12' className="text-center">
                        <span className="text large">{this.state.username}</span>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col xs='12' className="text-center">                        
                        <span className="text large">{this.state.points}</span>                        
                    </Col>
                </Row>
                <Row>
                    <Col xs='12' className="text-center">
                        <Link to="/student/irregular-verbs">
                            <Button outline>irregular verbs</Button>
                        </Link>
                    </Col>
                    <Col xs='12' className="text-center">
                        <Link to="/student/qanda">
                            <Button outline>Phrasal verbs Q&A</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Sidemenu;