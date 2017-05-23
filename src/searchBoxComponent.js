import React, { Component } from 'react';
import './App.css';

class SearchBoxComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults:[],
      individualDetails:'',
    }
  }

  searchStarApi=(event)=>{

    const searchText = event.target.value;
    const searchType = this.props.boxType;
    let searchElementList = [],
        self = this;


    if(event.target.value.length > 0){
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", `https://swapi.co/api/${searchType}/?search=${searchText}`, false ); // false for synchronous request
      xmlHttp.send( null );
      const response = JSON.parse(xmlHttp.responseText).results;
      console.log('response', response);

      if (response.length > 0){
        response.map(function(data,index){
          const dataVar = data;
          searchElementList.push(<div>{data["name"]}</div>);
        })
      }else{
        searchElementList.push(<div>No results found</div>);
      }
    }else{
      searchElementList = [];
      this.setState({
        individualDetails:''
      })
    }
    this.props.showSearchResults(searchElementList,this.props.boxType);
  }

  showDetails=(detail)=>{
    console.log(detail);
    let individualDetail = [];
    if(this.props.boxType === "people"){
      individualDetail.push(<div className = "individualDetail">
                              <div>Height : {detail.height}</div>
                              <div>mass : {detail.mass}</div>
                            </div>)
    }else if(this.props.boxType === "planets"){
      individualDetail.push(<div className = "individualDetail">
                              <div>rotation_period : {detail.rotation_period}</div>
                              <div>population : {detail.population}</div>
                            </div>)
    }else{
      individualDetail.push(<div className = "individualDetail">
                              <div>model : {detail.model}</div>
                              <div>manufacturer : {detail.manufacturer}</div>
                            </div>)
    }
    this.setState({
      individualDetails:individualDetail
    })
  }

  render() {
    return (
      <div className="searchBox">
        <input type = "text" className = "searchBox" placeholder = {"Search here for "+this.props.boxType} onChange={this.searchStarApi}/>
        {this.state.individualDetails}
      </div>
    );
  }
}

export default SearchBoxComponent;
