import React, { Component } from "react";
import { Card, Row } from "react-bootstrap";
import Slider from "react-slick";
import LineChart from "../lineCharts";
import "./content.css";
import {urls} from "../../config";
import axios from 'axios';

const settings = {
  dots: true,
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
      searchKey:{}
    };
  }
  componentWillReceiveProps(props){
    let {org,searchKey} = props
    console.log("serarch key",searchKey)
    if (searchKey === null){
      searchKey = org.item.name
    }
    // get org
    axios.get(urls["listOrg"]+org.item.id)
      .then(res => {
        const orgData = res.data.data;
        this.setState({ orgData:orgData });
      })
    // get tickets
    axios.get(urls["getTickets"]+searchKey)
      .then(res => {
        const tickets = res.data.data.results;
        this.setState({ tickets:tickets });
      })
    // get transactions
    // axios.get(urls["getTrans"]+searchKey)
    //   .then(res => {
    //     const transaction = res.data.data;
    //     this.setState({ transaction:transaction });
    //   })
      axios.get(urls["getTrans"]+"gokwik")
      .then(res => {
        const transaction = res.data.data;
        this.setState({ transaction:transaction });
      })
  }

  render() {
    const {orgData,tickets,transaction} = this.state
    return (
      <div>
        <div>
        <Row>
            <div className="heading">Org Details</div>
          </Row>
          {orgData && orgData.organizationName &&
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
              onClick={() =>
                window.open(
                  orgData.deals &&
                    orgData.deals.length > 0 &&
                    orgData.deals[0].url
                )
              }
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
          }
          
          <hr />
          <Row>
            <div className="heading">My Tickets</div>
          </Row>
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
              })}
          </Slider>
          <br/><br/>
          <hr />
          <Row>
            <div className="heading">Payments</div>
          </Row>
        </div>
        <div className="transactions">
          {transaction && transaction.length>2 && <LineChart data={transaction}/>}
          
        </div>
        <hr />
        <Row>
          <div className="heading">Important Pointers</div>
        </Row>
        <div>
          {orgData.deals &&
            orgData.deals.length > 0 &&
            orgData.deals.map((item) => {
              return (
                <Card className="address">
                  <Card.Body>
                    <Card.Text>Deal value : {item.dealValue}</Card.Text>
                    <Card.Text>Deal Status : {item.status}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
        </div>
      </div>
    );
  }
}
