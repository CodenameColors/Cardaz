import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//switching "pages"
import { BrowserRouter, HashRouter, Route, Switch, Link, withRouter, } from 'react-router-dom';

//table 
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

//Graphing in D3
import {LineChart} from 'react-easy-chart';

//time formating
//import  moment from 'react-moment';
//import 'moment-timezone';

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
          this.setState({products : products});
          console.log(jsonResponse.data[0]);
        }
      }
    }
    
  }
  xhr.send('xhr', xhr); 
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
      hidden: false,
      fname: '',
      lname: '',
      zip: '',
      products: []
    };
    this.queryFilter();
  }

  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  puppydata = () => {
    console.log("Selecting");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", 'http://127.0.0.1:3001/api/filter/Filterrecords/?fname=a&lname=&zip=', true)
    xhr.setRequestHeader('Content-type','application/json');
    xhr.setRequestHeader('Access-Control-Allow-Methods','GET');

    console.log(xhr);

    xhr.onload = function(e){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var data = xhr.responseText;
          var jsonResponse = JSON.parse(data);
          console.log(jsonResponse.data[0]);
        }
      }
    }
    xhr.send('xhr', xhr); 
  }

  queryFilter = () => {

    console.log("Selecting");

    var xhr = new XMLHttpRequest();

    let url = "http://127.0.0.1:3001/api/filter/Filterrecords/?" 
    url += 'fname=' + this.state.fname;
    url += '&lname=' + this.state.lname;
    url += '&zip=' + this.state.zip;

    console.log(url)


    xhr.open("GET", url, true)
    xhr.setRequestHeader('Content-type','application/json');
    xhr.setRequestHeader('Access-Control-Allow-Methods','GET');

    console.log(xhr);

    xhr.onreadystatechange = (e) => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var data = xhr.responseText;
          var jsonResponse = JSON.parse(data);
          console.log(jsonResponse.data);

          const startId = products.length;
          for (let i = 0; i < jsonResponse.data.length; i++) {
          const id = startId + i;

          let temparr = [];

          temparr.push({
            id: jsonResponse.data[i].id,
            first_name: jsonResponse.data[i].first_name,
            last_name: jsonResponse.data[i].last_name,
            phone_number: jsonResponse.data[i].phone_number,
            street: jsonResponse.data[i].street,
            city: jsonResponse.data[i].city,
            state: jsonResponse.data[i].state,
            zip_code: jsonResponse.data[i].zip_code
          });
          
          if(jsonResponse.data.length == 0){
            this.setState({products: []});
          }
          else{
            this.setState({products: jsonResponse.data});
          }

          console.log(this.state.products)

        }
      }
    }
  }
    xhr.send('xhr', xhr); 
}

  setfname = (e) => {
    this.setState({fname: e.target.value});
    this.queryFilter();
  }

  setlname = (e) => {
    this.setState({lname: e.target.value});
    this.queryFilter();
  }

  setzip = (e) => {
    this.setState({zip: e.target.value});
    this.queryFilter();
  }


  render(){

  let renderObject = this;
  //describes the events for each row.
  const options = {

    //defines the function that runs when a row is clicked.
    onRowClick: (row) => {
      console.log('hewwo');
      this.props.setRecID(row.id);
      this.props.ToggleFn();
      renderObject.forceUpdate();
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
        First Name: <input type='text' name='title' value={this.state.fname} onChange={this.setfname}/>  
        Last Name: <input type='text' name='title' value={this.state.lname} onChange={this.setlname}/>  
        Zip Code: <input type='text' name='title' value={this.state.zip} onChange={this.setzip}/>  
      </span>

      <button onClick={this.puppydata}>
          Test
      </button>

    <BrowserRouter>

    <div id='tableRecord'>
     <Link to="/record">
      <BootstrapTable data={ this.state.products == [] ? [] : this.state.products }  selectRow={selectRowProp} options={options}  >

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
    //this.setCurrentRecord();
    this.state = {
      heartRecords: [],
      currentRecord: 0,
      currentRecordID: 0,
      rawHdata: []

    }
  }




  getRecord = () => {

    var xhr = new XMLHttpRequest();

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

//---------------------------------HEART RECORD ------------------------------------

    let xhr1 =  new XMLHttpRequest();
    xhr1.open("GET", `http://localhost:3001/api/heartrecord/${this.props.recordID}`, true);
    xhr1.setRequestHeader('Content-type','application/json');
    xhr1.setRequestHeader('Access-Control-Allow-Methods','GET');

    

    console.log(xhr1);
    let data1;
    let jsonResponse1;
    xhr1.onreadystatechange = (jsonResponse1) => {
      console.log('in xhr.onload')
      if(xhr.readyState === 4){
        console.log('in state 4');
        if(xhr.status === 200){

          data1 = xhr1.responseText;
          jsonResponse1 = JSON.parse(data1);
          console.log('jsondata');
          console.log(jsonResponse1.data); 

          //let products = this.state.products.splice();

          //console.log(this);
          let hr = {}
          
          hr = jsonResponse1.data;
          this.setState({heartRecords: jsonResponse1.data})

          let tempArray = [];
          this.state.heartRecords[0].raw_heart_data.data.forEach(function(ele, index){
            tempArray.push({x:index*5 ,y:ele});
          }  
          )
          this.setState({rawHdata: tempArray});

        
      }
    }
    
  }
    xhr1.send('xhr', xhr); 
}


  GoBack = () => {
    this.tableRecord = true;
    this.forceUpdate();
    this.props.ToggleFn();
  }

  s = "sssss";

  setCurrentRecord = (e) =>{

    this.setState({ currentRecord: e.target.value });
    //console.log(Date('2018-03-31T20:50:59.993Z'));
    let tempArray = [];

    let i = this.state.heartRecords[0].id;

    this.state.heartRecords[e.target.selectedIndex].raw_heart_data.data.forEach(function(ele, index){
      tempArray.push({x:index*5 ,y:ele});
    }  
    )
    this.setState({rawHdata: tempArray});

  }

  setRecordValues = () => {
    this.s = "memes"
  }

  render(){

    console.log(this.state.heartRecords);
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
      <select value={this.state.currentRecord} onChange={this.setCurrentRecord}>

        {this.state.heartRecords.map( (hr) => <option value = 
          {hr.created_at} >
          {hr.created_at}  </option> )}

      </select>


        <LineChart
        
        grid
        lineColors={['red']}
        verticalGrid
        axes
        axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
        width={600}
        height={300}
        data={[this.state.rawHdata]}
        />  

    </div>
    )
  }
}

export default App;
