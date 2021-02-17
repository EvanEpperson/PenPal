import React, { useState } from 'react'
import { Image, ImageBackground, SafeAreaView } from 'react-native';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { keys, setAsyncStorage, setUniqueValue, uuid } from '../asyncStorage';
import firebase from '../firebase'

const SignUp = ({navigation}) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = credentials;
  const setInitialState = () => {
    setCredential({ email: "", password: "", confirmPassword: "" });
  };

  const onLoginPress = () => {
    if (!name) {
      alert("Name is required");
    } else if (!email) {
      alert("Email is required");
    } else if (!password) {
      alert("Password is required");
    } else if (password !== confirmPassword) {
      alert("Password did not match");
    } else {
      SignUpRequest(email, password)
        .then((res) => {
          if (!res.additionalUserInfo) {
            alert(res);
            return;
          }
          let uid = firebase.auth().currentUser.uid;
          let profileImg = "";
          AddUser(name, email, uid, profileImg)
            .then(() => {
              setAsyncStorage(keys.uuid, uid);
              setUniqueValue(uid);
              navigation.replace("Dashboard");
            })
            .catch((err) => alert(err));
        })
        .catch((err) => {
          console.log(firebase.auth().currentUser);
          alert(err);
        });
    }
  };

  const handleOnChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const SignUpRequest = async (email, password) => {
    try {
      return await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    } catch (error) {
      return error;
    }
  };
 const AddUser = async (name, email, uid, profileImg) => {
    try {
      return await firebase
        .database()
        .ref("users/" + uid)
        .set({
          name: name,
          email: email,
          uuid: uid,
          profileImg: profileImg,
        });
    } catch (error) {
      return error;
    }
  };





    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
      >
        <SafeAreaView style={styles.container}>
          <ImageBackground
            source={{
              uri:
                "https://c0.wallpaperflare.com/preview/693/266/472/communication-letters-envelope-write.jpg",
            }}
            style={styles.backgroundImage}
            resizeMode="stretch"
          />
          {/* <View>
            <Image
              source={{
                uri:
                  "https://techcrunch.com/wp-content/uploads/2018/12/getty-messaging.jpg",
              }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 20,
              }}
            />
          </View> */}
          <View style={styles.inputContainer}>
            <Input
              placeholder="Enter Name"
              value={name}
              onChangeText={(text) => handleOnChange("name", text)}
            />
            <Input
              placeholder="Email"
              value={email}
              onChangeText={(text) => handleOnChange("email", text)}
            />
            <Input
              placeholder="Enter password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => handleOnChange("password", text)}
            />
            <Input
              placeholder="Confirm password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => handleOnChange("confirmPassword", text)}
              onSubmitEditing={() => onLoginPress()}
            />
          </View>
          <Button
            title="Login"
            onPress={() => onLoginPress()}
            style={styles.button}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  inputContainer: {
    width: 300,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.3,
  },
});
