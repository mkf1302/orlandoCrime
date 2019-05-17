import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import PoliceCar from "./PoliceCar";
import Col from "./Col";
import Map from "./Map";
import SearchForm from "./SearchForm";
import API from "../utils/API";
import Geocode from "react-geocode";
import Carousel from 'react-bootstrap/Carousel';
import "./style.css";




class MapContainer extends Component {
  state = {
    result: [],
    search: "",
    lat: 28.538336,
    lng: -81.379234
  };


  
  componentDidMount() {
    // Get latidude & longitude from address.
    Geocode.setApiKey("AIzaSyCnk106_VHUZFICwWr5UB_c2JYor-0BWpI");
    this.getCrimeData();
  }

  getCrimeData = () => {
    
    API.generalGET()
  .then(res =>{
    // console.log("API crime data results: ", res.data)
    this.setState({ result: res.data })})
  .catch(err => console.log(err))

    Geocode.fromAddress(this.state.search).then(
      response => {
        var { lat, lng } = response.results[0].geometry.location;
        console.log("Zip Code Entered: ", this.state.search, "lat and long", lat, lng);  
        this.setState({
          lat: lat,
          lng: lng
        })   
      },
      error => {
        console.error(error);
      },
    );
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Map API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.getCrimeData(this.state.search);
    console.log("Search Button on click: ", this.state.search)
  };

  render() {
    return (
<Container>
<Row>
  <PoliceCar backgroundImage="https://ak2.picdn.net/shutterstock/videos/11777042/thumb/1.jpg">
    <h1>Orlando Crime Reports</h1>
  </PoliceCar>
  </Row>
        <Row>
          <form-control heading="Search">
            <SearchForm
              value={this.state.search}
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
            />
          </form-control>          
        </Row>
        <Row>
          <Map
            lat={this.state.lat}
            lng={this.state.lng}
            data={this.state.result}
          >
          </Map>
        </Row>
        <Row>
          <div className="crimelist">
          {
            this.state.result.map((item, key) => {
              // console.log("Item: ", item)
             return  <span key={key}>
                {/* <ul>Location: {item.case_location}</ul>
                <ul>Offense Category: {item.case_offense_category}</ul> */}
              </span>
            })
          }
          </div>
        </Row>
      </Container>
    );
  }

}

export default MapContainer;
