import {createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import contactReducer from '../reducers/ContactReducer';

import {getContacts} from '../actions/ContactActions';

import {getItems} from '../../repository/ContactRepository';
import {ContactSchema} from '../models/Contact';

export const getAllContacts = () => {
  return async (dispatch) => {
    try {
      const contacts = await getItems(ContactSchema);
      dispatch(getContacts(contacts));
    } catch (error) {
      console.log(
        '----------Getting contacts from database Error---------',
        error,
      );
    }
  };
};

export default createStore(contactReducer, applyMiddleware(thunk));
