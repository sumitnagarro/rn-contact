import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {Text} from 'react-native';

const FavoriteContacts = () => {
  return (
    <Container>
      <Content
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>This is favorite contact component.</Text>
      </Content>
    </Container>
  );
};

export default FavoriteContacts;
