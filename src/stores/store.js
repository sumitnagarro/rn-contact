import {createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import contactReducer from '../reducers/ContactReducer';

import {getContacts, insertContact} from '../actions/ContactActions';

import {getItems, insertData} from '../../repository/ContactRepository';
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

export const insertNewContact = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      //Adding data in db
      await insertData(ContactSchema, data);
      //Getting all items and adding in state to show in contact list
      const contacts = await getItems(ContactSchema);
      dispatch(insertContact(contacts));
    } catch (error) {
      console.log(
        '----------Error in insert contacts in store.js from database Error---------',
        error,
      );
    }
  };
};

export default createStore(contactReducer, applyMiddleware(thunk));
