import React, {useState} from 'react';
import {CheckBox, ListItem, Body} from 'native-base';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Input from '../components/Input';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Button from '../components/FormButton';
import {connect} from 'react-redux';

import {v4 as uuidv4} from 'uuid';
import ImagePicker from 'react-native-image-picker';
import {
  insertNewContact,
  updateExistingContact,
  deleteSelectedContact,
} from '../stores/store';
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
  const renderDelete = () => {
    if (data.id != '' && data.id != undefined) {
      return (
        // <TouchableOpacity>
        //   <Text>Delete me</Text>
        // </TouchableOpacity>

        <Button
          onPress={async () => {
            props.deleteSelectedContact(data.id);
            props.navigation.pop();
          }}
          text="Delete contact"
        />
      );
    }
  };
  let {item} = props.route.params;
  const data =
    item === undefined
      ? {
          favorite: false,
          id: undefined,
          mobileNumber: '',
          name: '',
          photo: undefined,
          telephoneNumber: '',
        }
      : item;

  //Image picker

  const [imagePath, setImagePath] = useState(data.photo);
  const [fav, setFav] = useState(data.favorite);
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = response;
        console.log(source.path);

        setImagePath(source.path);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => {
            chooseFile();
            //props.navigation.pop();
          }}>
          <Image
            source={
              imagePath === undefined || imagePath === null
                ? require('../images/image.jpg')
                : {uri: `file://${imagePath}`}
            }
            style={{
              width: 100,
              flex: 1,
              height: 100,
              borderRadius: 100 / 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </TouchableOpacity>
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
            values.photo = imagePath;
            values.favorite = fav;
            //console.log(values);

            if (values.id === undefined) {
              console.log('Insert request in contact details.');
              //insert request
              //Create Id
              values.id = uuidv4().toString();
              props.insertNewContact(values);
            }
            //Otherwise update contact request
            props.updateExistingContact(values);
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
                <ListItem>
                  <Body>
                    <Text style={{marginLeft: 30}}>Favorite :</Text>
                  </Body>
                  <CheckBox
                    checked={fav}
                    color="green"
                    onPress={() => {
                      setFav(!fav);
                    }}
                  />
                </ListItem>
                <View style={styles.formAction}>
                  <Button
                    {...isSubmitting}
                    onPress={handleSubmit}
                    text="Save contact"
                  />
                  {renderDelete()}
                </View>
              </>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingTop: 20,
    padding: 10,
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
  deleteSelectedContact,
  insertNewContact,
  updateExistingContact,
};

export default connect(null, mapDispatchToProps)(ContactDetail);
