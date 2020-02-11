import React from 'react';
import ImageJumbotron from '../components/jumbotron.component';
import {
    Row,
    Col,
    Container,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

const ButtonsBlock = (changePage) => {
    // const clickHandler = (e) => {
    //     changePage(e.target.id);
    // }
    return (
        <div>
            <Link to='/student'>
                <Button color="primary" size="lg" outline block id='student'>Study now</Button>
            </Link>
        </div>
    )
}

const StudentText = () => {
    return (<div>
        <h4>Giving you the tools to succeed!</h4>
        <p>Learning languages isn't easy. We want to offer you as many tools as possible for you to succeed in mastering your new language.</p>
        <p>At the moment, we're focusing on providing extra materials to help those studying English and Spanish. Everything on this site is totally free and available to everyone.</p>
        <p>If you want some one-on-one help in your language studies, feel free to check out our online language classes.</p>
    </div>)
}

const TeacherText = () => {
    return (
        <div>
            <h4>By teachers for teachers</h4>
            <p>Linglos is a project by language teachers to encourage language learning for everyone. We want to offer the best tools to give language learners the best possible chance to improve their skills. We also want to lighten the load of planning and preparation for teachers, so that they can focus on what they do best: teaching.</p>
            <p>This is a young project and we're adding to it all the time. If you want to contribute or get involved in any way at all, please don't hesitate to contact us.</p>
        </div>
    )
}


class FrontPage extends React.Component {
    constructor(props){
        super(props);
        this.test();
    }
    test() {
        console.log(this);
    }
    ModeSelector = (props) => {
        const inlineStyle = {
            cursor:'pointer'
        }
        const createClassList = () =>{
            if (props.text === this.props.mode) {
                return ``;
            } else {
                return 'text-muted'
            }
        }
        const clickHandler = () => {
            this.props.setMode(props.text);
        }
        return (
            <div
                className={createClassList()}
                onClick={clickHandler}
                style={inlineStyle}>
                    <h4 className="display-4">{` ${props.text}`}</h4>
                    </div>
        )
    }
    render () {
        return (
            <div>
                <ImageJumbotron />
                <Container >
                    <Row className="text-center">
                        <Col sm='12'>
                            <h5>I am a</h5>
                        </Col>                        
                    </Row>
                    <Row className="text-center">
                        <Col xs='12' md={{size:6, offset:3}}>
                            <Row>
                                <Col xs='6'>
                                    {this.ModeSelector({text:'student'})}
                                </Col>
                                <Col xs='6'>
                                    {this.ModeSelector({text:'teacher'} )}
                                </Col>
                            </Row>
                        </Col>

                    </Row>   
                    <Row>
                        <Col md='4'>
                            {ButtonsBlock(this.props.changePage)}
                        </Col>
                        <Col md='8' className="text-right">
                            {this.props.mode === 'teacher' ? <TeacherText /> : <StudentText />}
                        </Col>
                    </Row>           
                </Container>
                  
            </div>
        )
    }
}

export default FrontPage;