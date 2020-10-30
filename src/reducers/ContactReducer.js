import {
  GET_CONTACTS,
  GET_CONTACT_BY_ID,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  INSERT_CONTACTS,
} from '../constants/Constants';

// Todo set initIal state from realm db for contacts

const initialState = {
  contacts: [],
  loading: true,
  error: '',
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };

    case GET_CONTACT_BY_ID:
      break;

    case UPDATE_CONTACT:
      break;

    case DELETE_CONTACT:
      break;

    case INSERT_CONTACTS:
      break;

    default:
      return state;
  }
};

export default contactReducer;
