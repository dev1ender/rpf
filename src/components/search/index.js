import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import {urls} from "../../config";
import axios from 'axios';
import {Button } from "react-bootstrap";

export default class SingleSelect extends Component {
  state = {
    orgList:[],
    searchKey:''
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  onSearch=(props)=>{
    if (props.code === "Enter"){
      let orgList = []
      axios.get(urls["searchOrg"]+this.state.searchKey)
        .then(res => {
          const data = res.data.data.items;
          data.map(item=>{
            let obj = {}
            obj.label = item.item.name
            obj.value = item
            orgList.push(obj)
          })
          this.setState({ orgList:orgList });
        })
        .catch(error=>{
          console.log("error",error)
        })
    }
    
  }

  onSelect=(data)=>{
    this.props.setOrg(data.value)
    if (this.state.searchKey !==''){
      localStorage.setItem("searchKey",this.state.searchKey)
    }
  }

  onInputChange=(props)=>{
    this.setState({searchKey:props})
  }

  render() {
    const { orgList} = this.state;
    console.log("orgList",orgList)
    return (
      <Fragment>
        <Select
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            isClearable={true}
            isRtl={false}
            name="color"
            options={orgList}
            onChange={(orgId)=>this.onSelect(orgId)}
            onKeyDown={this.onSearch}
            onInputChange={this.onInputChange}
          />
      </Fragment>
    );
  }
}