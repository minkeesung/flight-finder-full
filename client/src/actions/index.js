import axios from 'axios';
import reqBody from '../utils/api_body';
import parse_api_response from '../utils/parsing';
import convert_city_to_airportcode from '../utils/cities'
import { FETCH_TRIPS, AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';
// import * as API from '../qpx-express'
import API from 'qpx-express'
const API_KEY = 'AIzaSyBW6j4MVKhK1fRRHAc7FI28zn3PBGZO_Wc';

var qpx = new API(API_KEY);

export const fetchTrips = (values, history) => async dispatch => {
  let i = values.departure_date.toISOString().indexOf('T')
  let departure_date = values.departure_date.toISOString().substring(0,i)
  let n = values.arrival_date.toISOString().indexOf('T')
  let arrival_date = values.arrival_date.toISOString().substring(0,n)

  // qpx.getInfo(
  //   reqBody(
  //     convert_city_to_airportcode(values.origin),
  //     convert_city_to_airportcode(values.destination),
  //     departure_date,
  //     arrival_date,
  //     values.numGuests
  //   ),
  //   function(error, flights) {
  //     var trips = parse_api_response(error, flights);
  //
  //     dispatch({ type: FETCH_TRIPS, payload: trips });
  //   }
  // );
  history.push('/trips');
  let trips = [{arrival_time: 8, departure_time: 9, carrier: 1, destination: 29, origin: 29, saleTotal: 92}, {arrival_time: "a", departure_time: "a", carrier: "a", destination: 29, origin: 29, saleTotal: 92}]

  dispatch({ type: FETCH_TRIPS, payload: trips });
};

export function saveTrips(trips) {
  axios.post('/api/savetrip', trips)
  return ({ type: FETCH_TRIPS, payload: null })
}


export function signinUser({ email, password }, history) {
  return function(dispatch) {

    axios.post('/api/signin', { email, password})
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
    axios.post('/api/signup', { email, password })
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
