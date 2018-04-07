import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Header,
  StackNavigator,
  MyHomeScreen,
  Animated,
  Easing,
  ScrollView,
  RefreshControl,
  AppRegistry
} from 'react';

import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';

const Headertest = (props) => (

  <div>
    <img src={props.src}/>
  </div>

  )

class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    
    )
  }
}


class HomePage extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  puppydata = () => {
    console.log("Selecting");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", 'http://127.0.0.1:3001/api/puppies/5', true)
    xhr.setRequestHeader('Content-type','application/json');
    xhr.setRequestHeader('Access-Control-Allow-Methods','GET');

    xhr.send('xhr', xhr)

    console.log(xhr);

    xhr.onload = function(e){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var story = JSON.parse(xhr.response)
          console.log(story);
        }
      }
    }
  }

  storepuppy = () => {
    console.log("inserting");

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "http://127.0.0.1:3001/api/puppies", true);
    //this line is the same as a curl statement.
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.setRequestHeader('Access-Control-Allow-Methods','POST');

    xhr.send("name=tony&breed=dumb&age=5&sex=M");

       xhr.onload = function(e){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var story = JSON.parse(xhr.response)
          console.log(story);
        }
      }
    }  
  }


  updatepuppy = () => {
    console.log("updaating");

    var xhr = new XMLHttpRequest();

    xhr.open("PUT", "http://127.0.0.1:3001/api/puppies/5", true);
    //this line is the same as a curl statement.
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.setRequestHeader('Access-Control-Allow-Methods','PUT');

    xhr.send("name=hunter&breed=blehhh&age=12&sex=F");

       xhr.onload = function(e){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var story = JSON.parse(xhr.response)
          console.log(story);
        }
      }
    }  
  }


  removepuppy = () => {
    console.log("removing");

    var xhr = new XMLHttpRequest();

    xhr.open("DELETE", "http://127.0.0.1:3001/api/puppies/2", true);
    //this line is the same as a curl statement.
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.setRequestHeader('Access-Control-Allow-Methods','DELETE');

    xhr.send("name=tony&breed=dumb&age=5&sex=M");

       xhr.onload = function(e){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var story = JSON.parse(xhr.response)
          console.log(story);
        }
      }
    }  
  }



  render() {
    return (
      <div className="App">
      <Headertest src={require('./images/heartbeat_header.png')}/>
      <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Users</h1>
        <button onClick={this.puppydata}>
          Get Puppy
        </button>
        <button onClick={this.storepuppy}>
          Store Puppy
        </button>
        <button onClick={this.updatepuppy}>
          update Puppy
        </button>
        <button onClick={this.removepuppy}>
          remove Puppy
        </button>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }
}



export default App;
