import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, TextInput, Text, Button, View, ScrollView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert } from 'react-native';


export default function LogIn({ navigation }) {
  const [newfont] = useFonts({
    poppins: require("../assets/fonts/Poppins-SemiBold.ttf")

  });
  let [emailAddressLogIn, setEmailAddressLogIn] = useState("");
  let [passwordLogIn, setPasswordLogIn] = useState("");

  const source = {
    html: `<a
    href="#"
    style="text-align:center;">
      Forgot Password?
     </a>`
  };
  return (
    <>
      <ScrollView>
        <View style={styles.headerLogin}>
          <ImageBackground style={styles.coverApplicationImage} source={require('../assets/ch6.jpg')} />
        </View>

        <View style={styles.logInLogoContainer}>
          <Text style={styles.logInLogo}>Welcome Back To Our Application!</Text>
        </View>

        <View style={styles.logInFormContainer}>
          <View style={styles.logInForm}>
            <View style={styles.textFieldLogInContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                onChangeText={(text) => {
                  setEmailAddressLogIn(text)
                }}
                placeholder='Email Address' style={styles.logInInfo} />
            </View>
            <View style={styles.textFieldLogInContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                onChangeText={(text) => {
                  setPasswordLogIn(text);
                }}
                secureTextEntry={true} placeholder='Password' style={styles.logInInfo} />
            </View>
           
            <View style={styles.signInBtnContainer}>
              <Button
                onPress={async () => {
                  let message = "LOG IN SUCCESS";
                  let emailAddress = emailAddressLogIn;
                  let password = passwordLogIn;


                  let data = {
                    emailAddress,
                    password
                  }


                  var end_point = "logIn";
                  await fetch(`https://alumnibackend-fathifathallah.onrender.com/${end_point}`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8"
                    }
                  }).then(response => response.json())
                    .then(json => {
                      console.log(json.message)
                      if (json.message == "success user") {
                        let userId = json._id;
                        navigation.navigate('Main', {
                          userId
                        });
                      }
                      else if (json.message == "password incorrect") {
                        Alert.alert('Log In Failed', 'password incorrect', [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                      }
                      else if (json.message == "email does not exists") {
                        Alert.alert('Log In Failed', 'email does not exists', [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                      }
                      else if (json.message == "email verification needed") {
                        Alert.alert('Log In Failed', 'email verification needed', [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                      }

                    })
                }}

                style={styles.signInBtn} title='Sign In' />
            </View>
            <View style={styles.signupplease}>
              <Text style={styles.signUptitle} > if you don't have an account, please</Text>
              <Text onPress={() => {
                navigation.navigate("SignUp")
              }} style={styles.signUpLink}>
                Sign Up </Text>
            </View>

          </View>

        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerLogin: {

    height: 360,
    borderBottomEndRadius: 400,
    backgroundColor: "#274584",
    overflow: 'hidden',
    position: 'relative'

  },

  coverApplicationImage: {
    height: 500,
    borderBottomEndRadius: 400,
    opacity: 0.4
  },

  overLay: {
    position: 'absolute',
    height: 500,
    borderBottomEndRadius: 400,
    top: 0,
    zIndex: 1
  },

  logInLogoContainer: {
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6

  },

  logInLogo: {
    textAlign: 'center',
    fontFamily: 'poppins',
    fontSize: 18
  },

  logInFormContainer: {
    height: 350,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',


  },

  logInForm: {
    width: 360,
    height: 340,
    display: 'flex',
    flexDirection: 'column'
  },

  logInInfo: {
    height: 50,
    backgroundColor: "white",
    backgroundColor: "#cceeff",
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'poppins'
  },
  label: {
    fontFamily: 'poppins',
    marginBottom: 5
  },

  textFieldLogInContainer: {
    marginBottom: 20
  },

  forgotPassword: {
    textDecorationLine: 'underline',
    color: '#4a8bb2',
    marginBottom: 10

  },

  forgotPassContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },

  signupplease: {
    marginTop: 10,
    textAlign: 'center'
  },

  signUptitle: {
    textAlign: 'center',

  },

  signUpLink: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#4a8bb2',
  },


  signInBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    // backgroundColor: 'red',
    width: '100%'


  },

  signInBtn: {
    width: '50%'
  },







});
