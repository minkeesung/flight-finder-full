import axios from 'axios';
import reqBody from '../utils/api_body';
import parse_api_response from '../utils/parsing';
import convert_city_to_airportcode from '../utils/cities'
import { FETCH_TRIPS, AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';
import * as API from '../qpx-express'
const API_KEY = 'AIzaSyBW6j4MVKhK1fRRHAc7FI28zn3PBGZO_Wc';
// var API = require('qpx-express');

var qpx = new API(API_KEY);

export const fetchTrips = (values, history) => async dispatch => {
  let trips = 'something';
  let i = values.departure_date.toISOString().indexOf('T')
  let departure_date = values.departure_date.toISOString().substring(0,i)
  let n = values.arrival_date.toISOString().indexOf('T')
  let arrival_date = values.arrival_date.toISOString().substring(0,n)

  qpx.getInfo(
    reqBody(
      convert_city_to_airportcode(values.origin),
      convert_city_to_airportcode(values.destination),
      departure_date,
      arrival_date,
      values.numGuests
    ),
    await function(error, flights) {
      var trips = parse_api_response(error, flights);
      console.log('first', trips);

      history.push('/trips');
      dispatch({ type: FETCH_TRIPS, payload: trips });
    }
  );

  console.log('second', trips);

};

export function fetchOldTrips() {

}

export function signinUser({ email, password }, history) {
  return function(dispatch) {

    axios.post('http://localhost:3090/signin', { email, password})
      .then(response => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token)

        history.push('/')
      })
      .catch(error => {
        dispatch(authError('Bad Login Info'))
      })
    }
}

export function signupUser({email, password}, history) {
  return function(dispatch) {
    axios.post('http://localhost:3090/signup', { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token)
        history.push('/')
      })
      .catch(error => {
        dispatch(authError(error.response.data.error))
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token')
  return { type: UNAUTH_USER }
}

export function saveFlight() {

}
