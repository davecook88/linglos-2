import React from 'react';
import Sidemenu from '../components/sidemenu.component';
// import {
//     Row,
//     Col,
//     Container,
// } from 'reactstrap';
// import { Link } from 'react-router-dom';
import IrregularVerbsGame from '../interactive/irregular-verbs/game';
import { BrowserRouter as Router, Route} from 'react-router-dom'; 
import './page.css'
import QandAGame from '../interactive/phrasal-verbs/qanda';

class StudentPage extends React.Component {
    render() {
        return (
            <div className="flex">
                <Router>
                <div className="sidebar-menu box-shadow-right">
                    <Sidemenu />
                </div>
                <div className="main-area">
                    
                        <Route path='/student/' exact />
                        <Route path='/student/irregular-verbs' component={IrregularVerbsGame} />
                        <Route path='/student/qanda' component={QandAGame} />
                    
                </div>
                </Router>
            </div>
        )
    }
}

export default StudentPage;