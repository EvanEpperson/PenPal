import React, { useEffect } from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { getAsyncStorage, keys, setUniqueValue } from '../asyncStorage';

const Splash = ({navigation}) => {
  useEffect(() => {
    const redirect = setTimeout(() => {
      getAsyncStorage(keys.uuid)
        .then((uuid) => {
          if (uuid) {
            setUniqueValue(uuid);
            navigation.replace("Dashboard");
          } else {
            navigation.replace("Login");
          }
        })
        .catch((err) => {
          console.log(err);
          navigation.replace("Login");
        });
    }, 500);
    return () => clearTimeout(redirect);
  }, [navigation]);
  return (
    <View>
      <ImageBackground
        source={{
          uri:
            "https://c0.wallpaperflare.com/preview/693/266/472/communication-letters-envelope-write.jpg",
        }}
        style={{
          width: "100%",
          height: "100%",
          // borderRadius: 20,
        }}
        resizeMode="stretch"
      />
    </View>
  );
}

export default Splash

const styles = StyleSheet.create({})
