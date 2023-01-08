import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesome } from '@expo/vector-icons';

import { TextInput, Text, TouchableOpacity, View, KeyboardAvoidingView } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { forgotPasswordRequested } from '../store/user';

export default function ForgotPasswordScreen({ navigation }: RootTabScreenProps<'ForgotPassword'>) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleForgotPassword = () => {
    if (isFormValid) {
      console.log('email valid, sending reset password link', email);
      dispatch(forgotPasswordRequested(email));
    }
  };

  const validateForgotPasswordDetails = () => {
    // TODO: validate if enter email is in correct format
    const isValid = email != '';

    setIsFormValid(isValid);

    return isValid;
  };

  useEffect(() => {
    const isValid = validateForgotPasswordDetails();
    setIsFormValid(isValid);
  }, [email]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <View style={styles.logoImage}>
          <Image source={require("../assets/images/kanekt_icon_square.png")} style={styles.image} resizeMode="center"></Image>
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Forgot your password?</Text>
      </View>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>
          Enter your email address to reset your password. We will send a link to your email. Follow the instructions to reset your password.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        {
          !isFormValid && (
            <Text style={styles.authFailedMsg}>Please enter your email address</Text>
          )
        }
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[styles.input, isFormValid && styles.inputError]}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleForgotPassword()}
          style={[styles.button, { opacity: !isFormValid ? 0.3 : 1 }]}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Reset password</Text>
        </TouchableOpacity>

        {/* TODO: move it to a separate component */}
        <View style={styles.separator}>
          <View style={{flex: 1, height: 1, backgroundColor: 'grey'}} />

          <View>
            <Text style={{width: 50, textAlign: 'center', backgroundColor: 'beige'}}>Or</Text>
          </View>
          
          <View style={{flex: 1, height: 1, backgroundColor: 'grey'}} />
        </View>

        <TouchableOpacity
          onPress={() => {navigation.navigate("Login")}}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'beige'
  },
  logoContainer: {
    alignSelf: "center",
    backgroundColor: "beige",
  },
  logoImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    overflow: "hidden"
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleContainer: {
    marginTop: 16,
    backgroundColor: 'red',
    textAlign: 'center',
  },
  title: {
    backgroundColor: 'beige',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitleContainer: {
    width: '70%',
    marginTop: 12,
  },
  subtitle: {
    backgroundColor: 'beige',
    fontSize: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 50,
    width: '80%',
    backgroundColor: 'beige',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
    height: 50,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  forgotPasswordLink: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
    textAlign: 'right',
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    backgroundColor: 'beige',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  authFailedMsg: {
    color: 'red',
    textAlign: 'center',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'beige',
    marginTop: 12,
    marginBottom: 12,
  },
});
