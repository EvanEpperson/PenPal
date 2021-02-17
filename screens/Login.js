import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, Image, KeyboardAvoidingView, ImageBackground} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import firebase from '../firebase'
import { setAsyncStorage, keys, setUniqueValue, getAsyncStorage } from "../asyncStorage/index";
// import LoginRequest from '../asyncStorage/index'

const Login = ({navigation}) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
const { email, password } = credentials;

const setInitialState = () => {
  setCredentials({ email: "", password: "" });
};  


  const handleOnChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

const LoginRequest = async (email, password) => {
  try {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
};

        

  onLoginPress = () => {
    if (!email) {
      alert("email is required");
    } else if (!password) {
      alert("password is required");
    } else {
      LoginRequest(email, password)
        .then((res) => {
          if (!res.additionalUserInfo) {
            alert(res);
            return;
          }
          setAsyncStorage(keys.uuid, res.user.uid);
          setUniqueValue(res.user.uid);
          setInitialState();
          navigation.replace("Dashboard");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  useLayoutEffect(() => {
    title: 'testing'
  } )

      // useEffect(() => {
      //   const redirect = setTimeout(() => {
      //     getAsyncStorage(keys.uuid)
      //       .then((uuid) => {
      //         if (uuid) {
      //           setUniqueValue(uuid);
      //           navigation.replace("Dashboard");
      //         } else {
      //           navigation.replace("Login");
      //         }
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //         navigation.replace("");
      //       });
      //   }, 500);
      //   return () => clearTimeout(redirect);
      // }, [navigation]);

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
      >
        {/* <ImageBackground style={styles.image}
          source={{
            uri:
              "https://techcrunch.com/wp-content/uploads/2018/12/getty-messaging.jpg",
          }}
        > */}
        {/* <Text style={styles.text}>Inside</Text> */}

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
        <View style={styles.inputContainer}>
          <Input
            placeholder="Enter Email"
            value={email}
            autoFocus
            onChangeText={(text) => handleOnChange("email", text)}
          />
          <Input
            placeholder="Enter password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => handleOnChange("password", text)}
            onSubmitEditing={() => onLoginPress()}
          />
        </View>
        <Button
          containerStyle={styles.button}
          title="Login"
          onPress={() => onLoginPress()}
        />
        <Button
          style={styles.button}
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
          title="Sign Up"
        />
        {/* </ImageBackground> */}
      </KeyboardAvoidingView>
    );
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 10,
  },
  inputContainer: {
    width: 350,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
