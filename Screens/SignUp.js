import { StatusBar } from "expo-status-bar";
import { Foundation } from '@expo/vector-icons';

import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Text,
  Button,
  View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Animated } from "react-native";
import { useFonts } from "expo-font";
import { Image } from "react-native";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ComboBox from "react-native-combobox";
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const countriesValues = [];
  const [newfont] = useFonts({
    poppins: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const [stateValues, setStateValues] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState(""); // FOR COUNTRY
  const [selectedStudyValue, setSelectedStudyValue] = useState(""); //FOR STUDY FIELD
  const [phoneNumber, setPhoneNumber] = useState("");
  const studyValues = ["IT", "Engineering", "Medicine", "Arts", "Economic"]

  async function getStateItems() {
    var headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "dFJHVUZZMm56M1AwT0FTU0ZERGRCU0hhbFVoNUdGWVdwQ3IxM1J6ag=="
    );
    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    await fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        JSON.parse(result).map((stateName) => {
          countriesValues.push(stateName.name);
        });

        setStateValues(countriesValues);
        console.log(stateValues);
      })
      .catch((error) => console.log("error", error));
  }

  const [isInputFocus, setInputFocus] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setBirthDate(date);
    hideDatePicker();
  };

  useEffect(() => {
    getStateItems();
  }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {/* GENERATE TEXT FIELDS */}
          <View style={styles.textFieldSignUpContainer}>
            <Text style={styles.label}>First Name</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  width: "10%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome
                  id="icon"
                  name="user"
                  size={20}
                  color="gray"
                ></FontAwesome>
              </View>

              <View style={{ width: "90%" }}>
                <TextInput
                  onChangeText={(text) => {
                    setInputFocus(true);
                    setFirstName(text);
                  }}
                  autoFocus={true}
                  autoCorrect={false}
                  placeholder="First Name"
                  style={styles.textInputSignUp}
                />
              </View>
            </View>
          </View>

          <View style={styles.textFieldSignUpContainer}>
            <Text style={styles.label}>Last Name</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  width: "10%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome
                  id="icon"
                  name="user"
                  size={20}
                  color="gray"
                ></FontAwesome>
              </View>
              <View style={{ width: "90%" }}>
                <TextInput
                  onChangeText={(text) => {
                    setInputFocus(true);
                    setLastName(text)
                  }}
                  autoFocus={true}
                  autoCorrect={false}
                  placeholder="Last Name"
                  style={styles.textInputSignUp}
                />
              </View>
            </View>
          </View>

          <View style={styles.textFieldSignUpContainer}>
            <Text style={styles.label}>Email Address</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  width: "10%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="email" size={24} color="gray" />
              </View>
              <View style={{ width: "90%" }}>
                <TextInput
                  onChangeText={(text) => {
                    setInputFocus(true);
                    setEmailAddress(text);
                  }}
                  autoFocus={true}
                  autoCorrect={false}
                  placeholder="Email Address"
                  style={styles.textInputSignUp}
                />
              </View>
            </View>
          </View>

          <View style={styles.textFieldSignUpContainer}>
            <Text style={styles.label}>Username</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  width: "10%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="user" size={24} color="gray" />
              </View>

              <View style={{ width: "90%" }}>
                <TextInput
                  onChangeText={(text) => {
                    setInputFocus(true);
                    setUserName(text)
                  }}
                  autoFocus={true}
                  autoCorrect={false}
                  placeholder="Username"
                  style={styles.textInputSignUp}
                />
              </View>
            </View>
          </View>

          <Text style={styles.label}>Birthdate</Text>
          <Button title="Show Date Picker" onPress={showDatePicker} />

          <Text style={styles.label}>Country</Text>
          <ComboBox values={stateValues} onValueSelect={setSelectedValue} />

          <Text style={styles.label}>Study Field</Text>
          <ComboBox values={studyValues} onValueSelect={setSelectedStudyValue} />

          <View style={styles.textFieldSignUpContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  width: "10%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Foundation name="telephone" size={24} color="black" />
              </View>
              <View style={{ width: "90%" }}>
                <TextInput
                  onChangeText={(text) => {
                    setInputFocus(true);
                    setPhoneNumber(text);
                  }}
                  autoFocus={true}
                  autoCorrect={false}
                  placeholder="Phone Number"
                  style={styles.textInputSignUp}
                />
              </View>
            </View>
          </View>


          <View style={styles.textFieldSignUpContainer}>
            <Text style={styles.label}>Password</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  width: "10%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Entypo name="lock" size={24} color="black" />
              </View>
              <View style={{ width: "90%" }}>
                <TextInput
                  onChangeText={(text) => {
                    setInputFocus(true);
                    setPassword(text)
                  }}
                  autoFocus={true}
                  secureTextEntry={true}
                  autoCorrect={false}
                  placeholder="Password"
                  style={styles.textInputSignUp}
                />
              </View>
            </View>
          </View>

          <View style={styles.textFieldSignUpContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  width: "10%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Entypo name="lock" size={24} color="black" />
              </View>
              <View style={{ width: "90%" }}>
                <TextInput
                  onChangeText={(text) => {
                    setInputFocus(true);
                    setConfirmedPassword(text)
                  }}
                  autoFocus={true}
                  secureTextEntry={true}
                  autoCorrect={false}
                  placeholder="Confirm Password"
                  style={styles.textInputSignUp}
                />
              </View>
            </View>
          </View>


          <Button title="Sign UP" onPress={async () => {
            console.log(firstName);
            console.log(lastName);
            console.log(userName);
            console.log(birthDate);
            console.log(emailAddress);
            console.log(stateValues[selectedValue]);
            console.log(selectedStudyValue);
            console.log(password);
            console.log(confirmedPassword);
            console.log(phoneNumber);

            let country = stateValues[selectedValue]

            // let data = {
            //   firstName,
            //   lastName,
            //   birthDate,
            //   emailAddress,
            //   stcountryate,
            //   phoneNumber,
            //   studyField: specialization.value,
            //   userName,
            //   password,
            // }

            let data = {
              birthDate,
              country,
              emailAddress,
              firstName,
              lastName,
              password,
              phoneNumber,
              studyField: studyValues[selectedStudyValue],
              studyState: "graduate",
              userName


            }

            console.log(studyValues[selectedStudyValue]);


            await fetch(`https://alumnibackend-fathifathallah.onrender.com/signUp`, {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            }).then(response => response.json())
              .then(json => {
                console.log(json);
              });



          }} />





        </View>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <View>
        <View>
          <View></View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textFieldSignUpContainer: {
    marginBottom: 20,
    backgroundColor: "",
  },

  label: {
    fontFamily: "poppins",
    marginBottom: 5,
  },
  container: {
    backgroundColor: "white",
    padding: 15,
    flex: 1,
  },
  textInputSignUp: {
    height: "100%",
  },
});
