import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import tripReducer from './tripReducer';
import authReducer from './auth_reducer'

const rootReducer = combineReducers({
  form: formReducer,
  trips: tripReducer,
  auth: authReducer
});

export default rootReducer;
