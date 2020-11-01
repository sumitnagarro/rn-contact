import {
  GET_CONTACTS,
  GET_CONTACT_BY_ID,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  INSERT_CONTACTS,
} from '../constants/Constants';
export const insertContact = (contacts) => ({
  type: INSERT_CONTACTS,
  payload: contacts,
});

export const getContact = (id) => {
  return {
    type: GET_CONTACT_BY_ID,
    payload: id,
  };
};

export const getContacts = (contacts) => {
  return {
    type: GET_CONTACTS,
    payload: contacts,
  };
};

export const updateContact = (contact) => ({
  type: UPDATE_CONTACT,
  payload: contact,
});

export const deleteContact = (contact) => ({
  type: DELETE_CONTACT,
  payload: contact,
});
