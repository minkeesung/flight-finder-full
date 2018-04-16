import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import { saveTrips } from '../actions';

class TripDisplay extends Component {
  saveFlight = (trip) => {
    this.props.saveTrips(trip)
  }

  tripInfo(title, info) {
    return (
        <div>{title}: {info}</div>
    );
  }

  renderTrips() {
    return _.map(this.props.trips, (trip, index) => {
      return (
        <ListGroup key={index}>
          <ListGroupItem>{this.tripInfo('Ticket price', trip.saleTotal)}</ListGroupItem>
          <ListGroupItem>{this.tripInfo('Carrier', trip.carrier)}</ListGroupItem>
          <ListGroupItem>{this.tripInfo('Departure time', trip.departure_time)}</ListGroupItem>
          <ListGroupItem>{this.tripInfo('Arrival time', trip.arrival_time)}</ListGroupItem>
          <ListGroupItem>{this.tripInfo('Destination', trip.destination)}</ListGroupItem>
          <ListGroupItem>{this.tripInfo('Origin', trip.origin)}</ListGroupItem>
          { this.props.authenticated && <button onClick={() => this.saveFlight(trip)} className="btn btn-primary">Save Flight</button> }
        </ListGroup>)
  })

  }

  render() {
    const { trips } = this.props;

    if (!trips) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>List of Flights</h1>
        {this.renderTrips()}
      </div>
    );
  }
}

function mapStateToProps({trips, auth}) {
  trips = [{arrival_time: 8, departure_time: 9, carrier: 1, destination: 29, origin: 29, saleTotal: 92}, {arrival_time: "a", departure_time: "a", carrier: "a", destination: 29, origin: 29, saleTotal: 92}]
  auth.authenticated = true
  return { trips, authenticated: auth.authenticated };
}

export default connect(mapStateToProps, {saveTrips})(TripDisplay);
