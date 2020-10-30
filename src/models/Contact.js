export const ContactSchema = {
  name: 'Contact',
  primaryKey: 'id',
  properties: {
    id: {type: 'string'},
    name: {type: 'string'},
    telephoneNumber: {type: 'string'},
    mobileNumber: {type: 'string'},
    favorite: {type: 'bool', default: false},
    photo: {type: 'string', default: 'photopath'},
  },
};
