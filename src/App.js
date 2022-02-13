import './App.css';
import React, { Component, Fragment } from 'react';
import Content from './components/content';
import SingleSelect from './components/search';
import LineChart from './components/lineCharts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      searchKey:''
    };
  }

  setOrg(org,searchKey){
    this.setState({org:org,searchKey:searchKey})
  }

  render() {
    return (
      <div className="App">
        <div className="dropDownContainer">
          <div className="dropDown">
            <SingleSelect setOrg={(org,searchKey)=>this.setOrg(org,searchKey)} />
          </div>
        </div>
        <div className="contentContainer">
          <Content org={this.state.org} searchKey={this.state.searchKey} />
        </div>
    </div>
    )
  }
}

export default App;
