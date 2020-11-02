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
import {getAllFavoriteContacts} from '../stores/store';

import {ContactSchema} from '../models/Contact';
import {connect} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {FloatingAction} from 'react-native-floating-action';
const FavoriteContacts = (props) => {
  useEffect(() => {
    props.getAllFavoriteContacts();
  }, []);

  const renderItem = ({item}) => {
    console.log(item);
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Detail', {item});
        }}>
        <View style={contactStyles.listItems}>
          <View style={contactStyles.listItem}>
            <Image
              source={
                item.photo === undefined || item.photo === null
                  ? require('../images/image.jpg')
                  : {uri: `file://${item.photo}`}
              }
              style={{
                flex: 1.8,
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
            <View style={{flex: 10}}>
              <Text style={contactStyles.normalText}>{item.name}</Text>
              <Text style={contactStyles.normalText}>{item.mobileNumber}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contacts,
});

const mapDispatchToProps = {
  getAllFavoriteContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteContacts);
