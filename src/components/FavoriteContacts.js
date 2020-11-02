import React from 'react';
import {Container, Content} from 'native-base';
import {Text, FlatList, View, TouchableOpacity, Image} from 'react-native';
import contactStyles from '../styles/ContactStyles';
import {getAllFavoriteContacts} from '../stores/store';

import {useFocusEffect} from '@react-navigation/native';
import {connect} from 'react-redux';
const FavoriteContacts = (props) => {
  useFocusEffect(
    React.useCallback(() => {
      props.getAllFavoriteContacts();
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

  const favContacts = props.favContacts;
  return (
    <Container>
      <Content
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FlatList
          data={favContacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  favContacts: state.favContacts,
});

const mapDispatchToProps = {
  getAllFavoriteContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteContacts);
