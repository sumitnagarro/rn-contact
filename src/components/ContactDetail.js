import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {Button, Text} from 'react-native';

const ContactDetail = (props) => {
  const {item} = props.route.params;
  return (
    <Container>
      <Content
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>This is detail component. {item.name}</Text>
        <Text>{item.mobileNumber}</Text>
        <Text>{item.id}</Text>
        <Text>{item.photo}</Text>
      </Content>
    </Container>
  );
};

export default ContactDetail;
