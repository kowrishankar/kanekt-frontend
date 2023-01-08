import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesome } from '@expo/vector-icons';

import { Text, TouchableOpacity, View, KeyboardAvoidingView } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { selectRegisterEmail } from '../store/userSelector';

export default function RegisterScreen({ navigation }: RootTabScreenProps<'RegisterVerification'>) {
  const emailToRegister = useSelector(selectRegisterEmail);

  const resendEmailVerification = () => {
    // TODO: call API to send email verification
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Almost there!</Text>
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.emailIcon}>
          <FontAwesome size={120} style={{ marginBottom: -3, textAlign: 'center' }} name="envelope-open-o" />
        </Text>

        <Text style={styles.instruction}>
          { `We've sent an email to ${emailToRegister || '***' } to verify your email address.` }
        </Text>

        <Text style={styles.instruction}>
          Please check your email and follow the link to activate your account.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {navigation.navigate('Login')}}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Already verified & Login again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => resendEmailVerification()}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Resend verification link</Text>
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
  titleContainer: {
    marginTop: 0,
    backgroundColor: 'red',
    textAlign: 'center',
  },
  title: {
    backgroundColor: 'beige',
    fontSize: 36,
  },
  messageContainer: {
    width: '80%',
    backgroundColor: 'beige',
    marginTop: 100,
  },
  emailIcon: {
    marginBottom: 24,
  },
  notVerifiedText: {
    backgroundColor: 'beige',
    color: 'red',
    textAlign: 'center',
    paddingBottom: 10,
  },
  instruction: {
    textAlign: 'center',
    marginBottom: 10
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'beige',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});
