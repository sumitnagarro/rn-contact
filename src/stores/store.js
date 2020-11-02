import {createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import contactReducer from '../reducers/ContactReducer';

import {
  getContacts,
  insertContact,
  updateContact,
  deleteContact,
} from '../actions/ContactActions';

import {
  getFavoriteItems,
  getItems,
  insertData,
  updateData,
  deleteData,
} from '../../repository/ContactRepository';
import {ContactSchema} from '../models/Contact';

export const getAllContacts = () => {
  return async (dispatch) => {
    try {
      const contacts = await getItems(ContactSchema);
      // Todo: Sort the data
      //contacts.sort((a, b) => a.name.localeCompare(b.name));
      dispatch(getContacts(contacts));
    } catch (error) {
      console.log(
        '----------Getting contacts from database Error---------',
        error,
      );
    }
  };
};

export const getAllFavoriteContacts = () => {
  return async (dispatch) => {
    try {
      const contacts = await getFavoriteItems(ContactSchema);
      // Todo: Sort the data
      //contacts.sort((a, b) => a.name.localeCompare(b.name));
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

export const updateExistingContact = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      //Adding data in db
      await updateData(ContactSchema, data);
      //Getting all items and adding in state to show in contact list
      const contacts = await getItems(ContactSchema);
      dispatch(updateContact(contacts));
    } catch (error) {
      console.log(
        '----------Error in insert updateExistingContact in store.js from database Error---------',
        error,
      );
    }
  };
};

export const deleteSelectedContact = (id) => {
  console.log(
    'Hello wwwwwwwwwwwwwwwwwwwwwooooooooooooooooooooorrrrrrrrrrrrrrrrrrrrrrrllllllllllllllllddddddddddddddd',
    id,
  );
  return async (dispatch) => {
    try {
      //Adding data in db
      await deleteData(ContactSchema, id);
      //Getting all items and adding in state to show in contact list
      const contacts = await getItems(ContactSchema);
      dispatch(deleteContact(contacts));
    } catch (error) {
      console.log(
        '----------Error in insert contacts in store.js from database Error---------',
        error,
      );
    }
  };
};

export default createStore(contactReducer, applyMiddleware(thunk));
