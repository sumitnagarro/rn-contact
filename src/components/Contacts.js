import React from 'react';
import {Container, Content} from 'native-base';
import {Text, FlatList, View, TouchableOpacity, Image} from 'react-native';
import contactStyles from '../styles/ContactStyles';
import {getAllContacts, insertNewContact} from '../stores/store';

import {connect} from 'react-redux';
import {FloatingAction} from 'react-native-floating-action';
import {useFocusEffect} from '@react-navigation/native';
const Contacts = (props) => {
  useFocusEffect(
    React.useCallback(() => {
      props.getAllContacts();
    }, []),
  );

  const renderItem = ({item}) => {
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
