import React, {Component, useEffect} from 'react';
import {Container, Content, Header, Left, Icon} from 'native-base';
import {
  Button,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import contactStyles from '../styles/ContactStyles';
import {getAllContacts, insertNewContact} from '../stores/store';

import {ContactSchema} from '../models/Contact';
import {connect} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {FloatingAction} from 'react-native-floating-action';
const Contacts = (props) => {
  useEffect(() => {
    props.getAllContacts();
  }, []);

  const renderItem = ({item}) => {
    //console.log(item);
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Detail', {item});
        }}>
        <View style={contactStyles.listItems}>
          <View style={contactStyles.listItem}>
            <Image
              source={require('../images/image.jpg')}
              style={{
                flex: 1.8,
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
            <View style={{flex: 10}}>
              <Text style={contactStyles.normalText}>{item.name}</Text>
              <Text style={contactStyles.normalText}>{item.mobile}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const actions = [
    {
      text: 'Add contact',
      icon: require('../images/add.png'),
      name: 'bt_accessibility',
      position: 1,
    },
  ];
  const contacts = props.contacts;
  return (
    <Container>
      <Content
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        {/* <Button
          title="Go to favorite contact"
          onPress={() => {
            props.navigation.navigate('FavoriteContacts');
          }}></Button>

        <Button
          title="Add data"
          onPress={async () =>
            props.dispatch(
              props.insertNewContact({
                id: uuidv4().toString(),
                name: 'hahahaha 3',
                telephoneNumber: 'hahahahah',
                mobileNumber: '8989898',
                favorite: true,
                photo: 'D',
              }),
            )
          }
          color="red"></Button> */}

        {/* <Button
          title="Add contact"
          onPress={() => {
            props.navigation.navigate('Detail', {
              name: '',
              telephoneNumber: '',
              mobileNumber: '',
            }); //Blank object
          }}></Button> */}
        <FloatingAction
          actions={actions}
          overrideWithAction={true}
          iconHeight={40}
          onPressItem={() => {
            props.navigation.navigate('Detail', {}); //Blank object
          }}
        />
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contacts,
});

const mapDispatchToProps = {
  getAllContacts,
  insertNewContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
