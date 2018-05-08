import React, { Component } from 'react';
import  { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './Home';
import Profile from './Profile';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Nav from './layout/Nav';
import Footer from './layout/Footer';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:null
    }
  }

  componentDidMount = () =>{
    console.log('component did mount!');
    this.getUser();
  }

  getUser= () =>{
    console.log('get user')
    var token = localStorage.getItem('mernToken');
    if(token){
      //token in local storage? validate it
      axios.post('/auth/me/from/token', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(response => {
        console.log('SUCCESS', response)
        this.setState({
          user: response.data.user
        });
      }).catch( err =>{
        console.log('ERROR', err, err.response)
        localStorage.removeItem('mernToken')
        this.setState({
          user:null
        })
      })
    }
    else {
        console.log('no token found')
        localStorage.removeItem('mernToken')
        this.setState({
          user:null
        })
    }
}

  render() {
    return (
      <div className="App">
        
      <Router>
        <div className='container'>
        <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={
            ()=>(<Login user={this.state.user} updateUser={this.getUser} />)
          } />
          <Route path="/signup" component={
            ()=>(<Signup user={this.state.user} updateUser={this.getUser} />)
          } />
          <Route path="/profile" component={Profile} />
        </div>
      </Router>
      <Footer />
      </div>
    );
  }
}

export default App;
