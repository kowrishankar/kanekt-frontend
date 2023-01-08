import { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Device from 'expo-device';

import { TextInput, Text, TouchableOpacity, View, KeyboardAvoidingView } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { selectRegisterSuccess } from '../store/userSelector';
import { registerFormSubmitted, registerFailed } from '../store/user';

export default function RegisterScreen({ navigation }: RootTabScreenProps<'Register'>) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const { isRegisterSuccess, errorMessage } = useSelector(selectRegisterSuccess);
  const deviceId = Device.deviceName;

  useEffect(() => {
    const isValid = validateRegisterDetails();
    setIsFormValid(isValid);
  }, [email, password, passwordConfirmation, firstName, lastName, username]);

  const validateRegisterDetails = () => {
    const passwordMatch = password === passwordConfirmation;

    const fieldsNotEmpty = [
      firstName,
      lastName,
      username,
      email,
      password,
      passwordConfirmation
    ].filter((field) => field === '').length === 0;

    return [
      passwordMatch,
      fieldsNotEmpty
    ].every(check => check);
  };

  const onRegister = () => {
    if (isFormValid) {
      dispatch(registerFormSubmitted({
        firstName,
        lastName,
        username,
        email,
        password,
        deviceId: 123
        // phone,
        // dateOfBirth,
        // bio,
        // creatorType,
        // contentType,
        // inviteCode,
      }));
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <View style={styles.logoImage}>
          <Image source={require("../assets/images/kanekt_icon_square.png")} style={styles.image} resizeMode="center"></Image>
        </View>
      </View>

      <View style={styles.inputContainer}>
        {
          !isRegisterSuccess && errorMessage && (
            <Text style={styles.authFailedMsg}>{errorMessage}</Text>
          )
        }

        <TextInput
          placeholder="First name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          // style={[styles.input, isFormValid && styles.inputError]}
          style={styles.input}
        />

        <TextInput
          placeholder="Last name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />

        <TextInput
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChangeText={(text) => setPasswordConfirmation(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity
          onPress={() => onRegister()}
          style={[styles.button, styles.buttonOutline, { opacity: !isFormValid ? 0.3 : 1 }]}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
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
          onPress={() => {navigation.navigate('Login')}}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
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
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
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
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
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
