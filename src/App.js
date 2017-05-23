import React, { Component } from 'react';
import SearchBoxComponent from './searchBoxComponent.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults:[],
      searchResultHeading:'',
    }
  }

  showSearchResults=(resultSet,heading)=>{
    this.setState({
      searchResults:resultSet,
      searchResultHeading:heading
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Star wars search portal</h2>
        </div>
        <div className="App-intro">
          <div className = "inlineBlock"><SearchBoxComponent showSearchResults = {this.showSearchResults} boxType = {'people'}/></div>
          <div className = "inlineBlock"><SearchBoxComponent showSearchResults = {this.showSearchResults} boxType = {'planets'}/></div>
          <div className = "inlineBlock"><SearchBoxComponent showSearchResults = {this.showSearchResults} boxType = {'starships'}/></div>
        </div>
        {
           this.state.searchResults.length > 0
          ?
           <div className = "searchHeading">Search Results for {this.state.searchResultHeading}</div>
          :
           null
        }
        <div>{this.state.searchResults}</div>
      </div>
    );
  }
}

export default App;
