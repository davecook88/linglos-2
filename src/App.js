import React from 'react';
import LightNavbar from './components/navbar.component';
import Footer from './components/footer.component';
import FrontPage from './pages/front-page.page';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode:'student',
      page:'front'
    }
  }
  route = () => {
    switch (this.state.page) {
      case 'front':
        return <FrontPage mode={this.state.mode} setMode={this.setMode}/>
      default:
        return <FrontPage mode={this.state.mode} setMode={this.setMode}/>
    }
  }
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
        {this.route()}
        <Footer />
      </div>
    );
  }
}

export default App;
