import React, {Component, useEffect} from 'react';
import {Container, Content} from 'native-base';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Input from '../components/Input';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Button from '../components/FormButton';

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
  //else if (values.mobileNumber.match(/\d/g).length === 11) {
  //     errors.mobileNumber = 'Minimum length of 11';
  //   }
  //   if (!values.telephoneNumber) {
  //     errors.telephoneNumber = 'Required';
  //   } else if (values.telephoneNumber.match(/\d/g).length === 11) {
  //     errors.telephoneNumber = 'Minimum length of 11';
  //   }
  return errors;
};

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(4, 'Minimum length of 4').required('Required'),
  mobileNumber: Yup.string()
    .min(11, 'Minimum length of 11')
    .max(11, 'Minimum length of 11')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Minimum length of 8').required('Required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .min(8, 'Minimum length of 8')
    .required('Required'),
});

const ContactDetail = (props) => {
  let {item} = props.route.params;
  const data =
    item === undefined
      ? {
          favorite: false,
          id: '',
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
        }}
        onSubmit={(values) => {
          console.log(values);
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
          console.log({values});
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

export default ContactDetail;
