import React from 'react';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import Booking from './pages/Booking.page';
import LightNavbar from './components/navbar.component';
import Footer from './components/footer.component';
import FrontPage from './pages/front-page.page';
import Login from './auth/Login';
import Register from './auth/Register';
import ResetPassword from './auth/ResetPassword';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import '../src/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentPage from './pages/student.page';
import store from './store';

import { Provider } from 'react-redux';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  //check current time against token expiration time. If token is expired logoutUser;
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser(decoded));

    window.location.href = "./login";
  }
}

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
        <Provider store={store}>
          <Router>
            <Route path='/' exact component={() => <FrontPage setMode={this.setMode} mode={this.state.mode} />} />
            <Route path='/student' component={StudentPage} />
            <Route path='/register' exact component={() => <Register />} />
            <Route path='/login' exact component={() => <Login />} />
            <Route path='/booking' exact component={() => <Booking />} />
            <Route path='/reset-password/:_id/:token' component={() => <ResetPassword />} />
            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </Router>
        </Provider>
        <Footer />
      </div>
    );
  }
}

export default App;
