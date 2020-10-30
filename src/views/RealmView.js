const Realm = require('realm');
import 'react-native-get-random-values';
import React, {Component} from 'react';
import {v4 as uuidv4} from 'uuid';
import {
  insertData,
  getItems,
  getItem,
  deleteData,
} from '../../repository/ContactRepository';
import {ContactSchema} from '../models/Contact';
import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import {getAllContacts} from '../stores/store';
import {connect} from 'react-redux';
class RealmDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {realm: null};
  }

  async componentDidMount() {
    await this.props.getAllContacts();
    Realm.open({
      schema: [ContactSchema],
    }).then((realm) => {
      this.setState({realm});
    });
  }

  componentWillUnmount() {
    // Close the realm if there is one open.
    // const {realm} = this.state;
    // if (realm !== null && !realm.isClosed) {
    //   realm.close();
    // }
  }

  addData() {
    insertData(ContactSchema, {
      id: uuidv4().toString(),
      name: 'A',
      telephoneNumber: 'B',
      mobileNumber: 'C',
      favorite: true,
      photo: 'D',
    });
  }

  async getData() {
    var data = await getItems(ContactSchema);
    console.log(data);
  }

  async getCon() {
    const id = '1cf81ea7-4da6-4bf3-96b0-d0978c09424a';
    var data = await getItem(ContactSchema, id);
    console.log(data);
  }

  async delCon() {
    const id = '1cf81ea7-4da6-4bf3-96b0-d0978c09424a';
    await deleteData(ContactSchema, id);
  }

  render() {
    const {contacts, loading} = this.props;

    //console.log(this.state.realm.objects('Contact').telephoneNumber);
    const info = this.state.realm
      ? 'Number of contacts in this Realm: ' +
        this.state.realm.objects('Contact').length
      : 'Loading...';

    const Item = ({item, onPress}) => (
      <TouchableOpacity onPress={onPress} color="skyblue">
        <Text color="red">{item.title}</Text>
      </TouchableOpacity>
    );

    const renderItem = ({item}) => {
      return <Text>{item.name}</Text>;
    };
    return (
      <View>
        <Text>Hello</Text>
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <Text>{info}</Text>
        <Button title="Add data" onPress={this.addData} color="red"></Button>
        <Button title="Get data" onPress={this.getData} color="red"></Button>
        <Button title="Get contact" onPress={this.getCon} color="red"></Button>
        <Button
          title="Delete contact"
          onPress={this.delCon}
          color="red"></Button>

        <View>
          {contacts.length ? (
            contacts.map((contact, i) => <Text key={i}>{contact.name}</Text>)
          ) : (
            <Text>No People</Text>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: state.contacts,
});

const mapDispatchToProps = {getAllContacts};

export default connect(mapStateToProps, mapDispatchToProps)(RealmDemo);
