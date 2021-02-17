import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Chat from "./screens/Chat";
import Dashboard from "./screens/Dashboard";
import Splash from "./screens/Splash";
import Login from "./screens/Login";
import ShowFullImg from "./screens/ShowFullImg";
import SignUp from "./screens/SignUp";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "black",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerBackTitle: null,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerBackTitle: null,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerBackTitle: null,
            title: "Sign Up to Start Pen Paling",
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerBackTitle: null,
            title: "PenPals",
          }}
        />
        <Stack.Screen
          name="ShowFullImg"
          component={ShowFullImg}
          options={{
            headerBackTitle: null,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            headerBackTitle: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
