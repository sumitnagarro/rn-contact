import React, {Component, useEffect} from 'react';
import {Container, Content} from 'native-base';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Input from '../components/Input';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Button from '../components/FormButton';
import {connect} from 'react-redux';

import {v4 as uuidv4} from 'uuid';

import {getAllContacts, insertNewContact} from '../stores/store';
const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 4) {
    errors.name = 'Minimum length of 4';
  }
  if (!values.mobileNumber) {
    errors.mobileNumber = 'Required';
  }
  return errors;
};

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(4, 'Minimum length of 4').required('Required'),
  mobileNumber: Yup.string().required('Required'),
});

const ContactDetail = (props) => {
  let {item} = props.route.params;
  const data =
    item === undefined
      ? {
          favorite: false,
          id: undefined,
          mobileNumber: '',
          name: '',
          photo: '',
          telephoneNumber: '',
        }
      : item;

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: data.name ?? '',
          mobileNumber: data.mobileNumber,
          telephoneNumber: data.telephoneNumber,
          id: data.id,
          photo: data.photo,
          favorite: data.favorite,
        }}
        onSubmit={async (values) => {
          //Saving data in realm
          console.log(values);
          if (values.id === undefined) {
            //insert request
            //Create Id
            values.id = uuidv4().toString();
            props.insertNewContact(values);
          }
          //Otherwise update contact

          props.navigation.pop();
          //props.insertNewContact(values);
        }}
        validate={validate}
        validationSchema={SignupSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          isSubmitting,
        }) => {
          //console.log({values});
          return (
            <>
              <View>
                <Input
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  touched={touched.name}
                  error={errors.name}
                  label="Name"
                />

                <Input
                  onChangeText={handleChange('mobileNumber')}
                  onBlur={handleBlur('mobileNumber')}
                  value={values.mobileNumber}
                  touched={touched.mobileNumber}
                  error={errors.mobileNumber}
                  label="Mobile Number"
                />
                <Input
                  onChangeText={handleChange('telephoneNumber')}
                  onBlur={handleBlur('telephoneNumber')}
                  value={values.telephoneNumber}
                  touched={touched.telephoneNumber}
                  error={errors.telephoneNumber}
                  label="Telephone Number"
                />
              </View>
              <View style={styles.formAction}>
                <Button
                  {...isSubmitting}
                  onPress={handleSubmit}
                  text="Save contact"
                />
              </View>
            </>
          );
        }}
      </Formik>
    </View>
    // <Container>
    //   <Content
    //     contentContainerStyle={{
    //       flex: 1,
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //     }}>
    //     <Text>This is detail component. {item.name}</Text>
    //     <Text>{item.mobileNumber}</Text>
    //     <Text>{item.id}</Text>
    //     <Text>{item.photo}</Text>
    //   </Content>
    // </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    // alignItems: "center",
    // justifyContent: "center",
    padding: 10,
    paddingTop: 64,
  },
  header: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 15,
  },
  formAction: {},
  conditionText: {
    marginVertical: 10,
    textAlign: 'center',
  },
  signIn: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInText: {
    color: 'rgb(51,130,246)',
  },
});

const mapDispatchToProps = {
  getAllContacts,
  insertNewContact,
};

export default connect(null, mapDispatchToProps)(ContactDetail);
