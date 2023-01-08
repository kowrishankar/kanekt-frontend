import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image } from 'react-native';

import { TextInput, Text, TouchableOpacity, View, KeyboardAvoidingView } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { loginFailed, loginRequested } from '../store/user';
import { selectAuthError } from '../store/userSelector';

export default function LoginScreen({ navigation }: RootTabScreenProps<'Login'>) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const isAuthFailed = useSelector(selectAuthError);

  const authenticate = () => {
    if (isFormValid) {
      dispatch(loginRequested({ username: email, password: password, deviceId: 123 }));
    }
  };

  const validateLoginDetails = () => {
    const isValid = email != '' && password != '';

    setIsFormValid(isValid);

    return isValid;
  };

  useEffect(() => {
    const isValid = validateLoginDetails();
    setIsFormValid(isValid);
  }, [email, password]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <View style={styles.logoImage}>
          <Image source={require("../assets/images/kanekt_icon_square.png")} style={styles.image} resizeMode="center"></Image>
        </View>
      </View>

      <View style={styles.inputContainer}>
        {
          isAuthFailed && (
            <Text style={styles.authFailedMsg}>Email or password is incorrect</Text>
          )
        }
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[styles.input, isAuthFailed && styles.inputError]}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={[styles.input, isAuthFailed && styles.inputError]}
          secureTextEntry
        />

        <TouchableOpacity onPress={() => navigation.replace('ForgotPassword')} style={styles.forgotPasswordLink}>
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {authenticate()}}
          style={[styles.button, { opacity: !isFormValid ? 0.3 : 1 }]}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Login</Text>
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
          onPress={() => {navigation.navigate("Register")}}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
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
