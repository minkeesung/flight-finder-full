import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import ListGroup from 'react-bootstrap/lib/ListGroup'


class TripDisplay extends Component {
  componentWillMount() {

  }

  renderButton() {
    if (this.props.authenticated) {
    return (<button action="submit" className="btn btn-primary">Save Flight</button>)}
  }

  tripInfo(title, info) {
    return (
        <div>{title}: {info}</div>
    );
  }

  renderTrips() {

    return _.map(this.props.trips, trip => {
      return (
        <ListGroup>
          <ListGroupItem>{this.tripInfo('Ticket price', trip.saleTotal)}</ListGroupItem>
          <ListGroupItem>{this.tripInfo('Carrier', trip.carrier)}</ListGroupItem>
          <ListGroupItem>{this.tripInfo('Arrival time', trip.arrival_time_when_leaving_home)}</ListGroupItem>
          <ListGroupItem>{this.tripInfo('Departure time', trip.departure_time_when_leaving_home)}</ListGroupItem>
          {this.renderButton()}
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

function mapStateToProps(state) {
  return { trips: state.trips.flights, authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(TripDisplay);
