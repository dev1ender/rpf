import React, { Component } from "react";
import { Card, Row,Spinner } from "react-bootstrap";
import Slider from "react-slick";
import LineChart from "../lineCharts";
import "./content.css";
import {urls} from "../../config";
import axios from 'axios';
import EmptyComponent from "../emptyComp";
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block",  }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block",  }}
      onClick={onClick}
    />
  );
}


export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      orgData:{},
      tickets:[],
      transaction:{},
      searchKey:{},
      ticketLoader :false,
      transLoader:false,
      orgLoader:false
    };
  }
  componentWillReceiveProps(props){
    let {org} = props
    const searchKey = localStorage.getItem("searchKey")
    if (searchKey === null){
      searchKey = org.item.name
    }
    // get org
    this.setState({
      ticketLoader :true,
      transLoader:true,
      orgLoader:true
    })
    axios.get(urls["listOrg"]+org.item.id)
      .then(res => {
        const orgData = res.data.data;
        this.setState({orgLoader:false, orgData:orgData });
      })
    // get tickets
    axios.get(urls["getTickets"]+searchKey)
      .then(res => {
        const tickets = res.data.data.results;
        this.setState({ticketLoader:false, tickets:tickets });
      })
    // get transactions
    axios.get(urls["getTrans"]+searchKey)
      .then(res => {
        const transaction = res.data.data;
        this.setState({transLoader:false, transaction:transaction });
      })
  }

  render() {
    const {orgData,tickets,transaction,orgLoader,transLoader,ticketLoader} = this.state
    return (
      <div>
        
        <div>
        <Row>
            <div className="heading">Org Details</div>
          </Row>
          {orgLoader && <Spinner animation="border" variant="secondary" />}
          {orgData && orgData.organizationName ?
          <div>
            <Row>
            <Card className="information">
              <Card.Body>
                <Card.Title>{orgData.organizationName}</Card.Title>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card
              className="address"
            >
              <Card.Body>
                <Card.Text>
                  <div>
                    {orgData.deals &&
                      orgData.deals.length > 0 &&
                      "Status: " + orgData.deals[0].status}
                  </div>
                  <div>
                    {orgData.deals &&
                      orgData.deals.length > 0 &&
                      "Owner: " + orgData.deals[0].ownerName}
                  </div>
                  <div>
                    {orgData.deals &&
                      orgData.deals.length > 0 &&
                      "Contact: " + orgData.deals[0].personName}
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
          </div>
          :!orgLoader && <EmptyComponent/>  
        }
          
          <hr />
          <Row>
            <div className="heading">My Tickets</div>
          </Row>
          {ticketLoader && <Spinner animation="border" variant="secondary" />}
          {tickets &&
              tickets.length > 0 ? 
          <Slider {...settings}>
            {tickets &&
              tickets.length > 0 &&
              tickets.map((item) => {
                return (
                  <div>
                    <Card
                      className="cardElem"
                      key="1"
                      onClick={() => window.open(item.ticketUrl)}
                    >
                      <Card.Body>
                        <Card.Text>
                          # {item.id}
                          <br />
                          {item.subject}
                          <br />
                          {item.created}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
              }
          </Slider>
          : !ticketLoader &&<EmptyComponent/>}
          <br/><br/>
          <hr />
          <Row>
            <div className="heading">Payments</div>
          </Row>
          
        </div>
        <div className="transactions">
          {transLoader && <Spinner animation="border" variant="secondary" />}
          {transaction && Object.entries(transaction).length>0 ? <LineChart data={transaction}/>:!transLoader && <EmptyComponent/>}
          
        </div>
        <hr />
        <Row>
          <div className="heading">Important Pointers</div>
        </Row>
        {orgLoader && <Spinner animation="border" variant="secondary" />}
        <div>
          {orgData.deals &&
            orgData.deals.length > 0 ?
            orgData.deals.map((item) => {
              return (
                <Card className="address" onClick={() =>window.open(item.url)
                }>
                  <Card.Body>
                    <Card.Text>Deal value : {item.dealValue}</Card.Text>
                    <Card.Text>Deal Status : {item.status}</Card.Text>
                  </Card.Body>
                </Card>
              );
            }):!orgLoader && <EmptyComponent/>}
        </div>
      </div>
    );
  }
}
