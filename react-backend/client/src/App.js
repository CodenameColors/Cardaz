import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import { BrowserRouter, HashRouter, Route, Switch, Link, withRouter, } from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {LineChart} from 'react-easy-chart';

import Record from './pages/record'

const Headertest = (props) => (

  <div>
    <img src={props.src}/>
  </div>

  )

class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <HomePage/>
      </BrowserRouter>
    
    )
  }
}



let showTable = true;
const products = [];



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function openInNewTab(url) {
  var win = window.open(url,'_blank');
  win.focus();
}

class HomePage extends Component {

   constructor(props) {
    super(props);
    this.state = {
      showTable: true,
      recID: 0
    };
  }


  state = {users: []}


  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
      this.addProducts(5);
      this.state.products = [];
  }

addProducts = (quantity) => {

  //grab the data from the database!
  console.log("Selecting");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", 'http://127.0.0.1:3001/api/record/', true);
    xhr.setRequestHeader('Content-type','application/json');
    xhr.setRequestHeader('Access-Control-Allow-Methods','GET');

    

    console.log(xhr);
    var data;
    var jsonResponse;
    xhr.onreadystatechange = (jsonResponse) => {
      console.log('in xhr.onload')
      if(xhr.readyState === 4){
        console.log('in state 4');
        if(xhr.status === 200){

          data = xhr.responseText;
          jsonResponse = JSON.parse(data);
          console.log(jsonResponse.data[0]); 

          const startId = products.length;
          for (let i = 0; i < jsonResponse.data.length; i++) {
          const id = startId + i;

          //let products = this.state.products.splice();

          console.log(this);
          products.push({
            id: jsonResponse.data[i].id,
            first_name: jsonResponse.data[i].first_name,
            last_name: jsonResponse.data[i].last_name,
            phone_number: jsonResponse.data[i].phone_number,
            street: jsonResponse.data[i].street,
            city: jsonResponse.data[i].city,
            state: jsonResponse.data[i].state,
            zip_code: jsonResponse.data[i].zip_code
          });
          this.setState({products});
          console.log(jsonResponse.data[0]);
        }
      }
    }
    
  }
  xhr.send('xhr', xhr); 
}

  puppydata = () => {
    console.log("Selecting");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", 'http://127.0.0.1:3001/api/record/', true)
    xhr.setRequestHeader('Content-type','application/json');
    xhr.setRequestHeader('Access-Control-Allow-Methods','GET');

    xhr.send('xhr', xhr)

    console.log(xhr);

    xhr.onload = function(e){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var data = xhr.responseText;
          var jsonResponse = JSON.parse(data);
          console.log(jsonResponse.data[0].first_name);
        }
      }
    }
  }

  ToggleFn= () => {
    this.setState({showTable: !this.state.showTable});
  }

  setRecID = (id) => {
    this.setState({recID: id})
  }


  render() {


    const selectRowProp = {
      mode: 'checkbox',
      hideSelectColumn: true,  // enable hide selection column.
      clickToSelect: true  // enable click to select
    };


    return (
      <div className="App">
        <Headertest src={require('./images/heartbeat_header.png')}/>
        {this.state.showTable ? (<RecordTable ToggleFn = {this.ToggleFn}  setRecID = {this.setRecID}/>) : (<PRecord ToggleFn = {this.ToggleFn} recordID = {this.state.recID}/>)}
      </div>

    );
  }
}

class RecordTable extends Component{

   constructor(props) {
    super(props);
    this.state = {
      hidden: false
    };
  }


  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }


  render(){
  let renderObject = this;
  //describes the events for each row.
  const options = {

    //defines the function that runs when a row is clicked.
    onRowClick: (row) => {
      console.log('hewwo');
      alert(`You click row id: ${row.id}`);
      this.props.setRecID(row.id);
      //let hid = this.state.hidden;
      //hid = false;
      //renderObject.setState({hid });
      this.props.ToggleFn();
      renderObject.forceUpdate();
      //openInNewTab('record');
      },
   
  }

  const selectRowProp = {
    mode: 'checkbox',
    hideSelectColumn: true,  // enable hide selection column.
    clickToSelect: true  // enable click to select
  };


    return( <div>
  <h1>Filters</h1>  
      <span>
        First Name: <input type='text' name='title' value={this.state.title} />  
        Last Name: <input type='text' name='title' value={this.state.title} />  
        Zip Code: <input type='text' name='title' value={this.state.title} />  
      </span>
      <button onClick={this.puppydata}>
          Get Record
      </button>
    <BrowserRouter>

    <div id='tableRecord'>
     <Link to="/record">
      <BootstrapTable data={ products }  selectRow={selectRowProp} options={options}  >

          <TableHeaderColumn width='150' dataField='id' isKey={ true }  >Patient ID</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='first_name'>First Name</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='last_name'>Last Name</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='phone_number'>Phone Number</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='street'>Street</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='city'>City</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='state'>State</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='zip_code'>Zip Code</TableHeaderColumn>
      
      </BootstrapTable>
        </Link>
      </div>
    </BrowserRouter>
    </div>
    )
  }
}

class PRecord extends Component {


  fname = "";
  phone = "";
  address = "";

   constructor(props) {
    super(props);
    this.setRecordValues();
    this.getRecord();
    this.state = {
      heartRecords: [],
      currentRecord: 0
    }
  }

  getRecord = () => {

    var xhr = new XMLHttpRequest();

    var id = 3;

    xhr.open("GET", `http://127.0.0.1:3001/api/record/${this.props.recordID}`, true);
    xhr.setRequestHeader('Content-type','application/json');
    xhr.setRequestHeader('Access-Control-Allow-Methods','GET');

    

    console.log(xhr);
    var data;
    var jsonResponse;
    xhr.onreadystatechange = (jsonResponse) => {
      console.log('in xhr.onload')
      if(xhr.readyState === 4){
        console.log('in state 4');
        if(xhr.status === 200){

          data = xhr.responseText;
          jsonResponse = JSON.parse(data);
          //console.log(jsonResponse.data[0]); 

          //let products = this.state.products.splice();

          //console.log(this);
          let notThis = {}
          notThis.fname = "Patient Name: " + jsonResponse.data.first_name + " " + jsonResponse.data.last_name;
          notThis.phone = "Phone#: " + jsonResponse.data.phone_number;
          notThis.address = "Address: " + jsonResponse.data.street + ", " + jsonResponse.data.city + " " + jsonResponse.data.zip_code;
          
          this.setState(notThis)
          console.log(jsonResponse.data.first_name);
        
      }
    }
    
  }
    xhr.send('xhr', xhr); 
}


  GoBack = () => {
    this.tableRecord = true;
    this.forceUpdate();
    this.props.ToggleFn();
  }

  s = "sssss";


  setRecordValues = () => {
    this.s = "memes"
  }

  render(){
  return (
    <div> 
    <button onClick={this.GoBack}>
          Back To Records
      </button>
      <div>
        {this.state.fname}
      </div>
      <div>
        {this.state.phone}
      </div>
      <div>
        {this.state.address}
      </div>
      <select value={this.state.currentRecord} onChange={(e) => this.setState({ currentRecord: e.target.value })}>

        {this.state.heartRecords.map( (hr) => <option value = {hr.appdate} > {hr.appdate}  </option> )}

      </select>


       <LineChart
    data={[
      
      
      
    ]}
  />`

    </div>
    )
  }
}

export default App;
