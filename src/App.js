import React from 'react';
import LightNavbar from './components/navbar.component';
import Footer from './components/footer.component';
import FrontPage from './pages/front-page.page';
import Login from './auth/Login';
import Register from './auth/Register';
import { BrowserRouter as Router, Route} from 'react-router-dom'; 
import '../src/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentPage from './pages/student.page';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode:'student',
    }
  }
  changePage = (pageName) => {
    this.setState({page:pageName});
  }
  // route = () => {
  //   switch (this.state.page) {
  //     case 'front':
  //       return <FrontPage mode={this.state.mode} changePage={this.changePage} setMode={this.setMode}/>
  //     case 'game':
  //       return <IrregularVerbsGame />
  //     default:
  //       return <FrontPage mode={this.state.mode} changePage={this.changePage} setMode={this.setMode}/>
  //   }
  // }
  setMode = (modeName) =>{
    this.setState({mode:modeName});
  }
  toggleMode = () => {
    if (this.state.mode === 'student') {
      this.setState({mode:'teacher'});
    } else {
      this.setState({mode:'student'});
    }
  }
  render () {
    return (
      <div>
        <LightNavbar toggleMode={this.toggleMode} mode={this.state.mode} />
        <Router>
          <Route path='/' exact component={() => <FrontPage setMode={this.setMode} mode={this.state.mode} />} />
          <Route path='/student' component={StudentPage} />
          <Route path='/register' exact component={() => <Register />} />
          <Route path='/login' exact component={() => <Login />} />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
