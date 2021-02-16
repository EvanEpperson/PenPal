import React, { Fragment, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import globalStyle from '../asyncStorage/globalStyle';




const ShowFullImg = ({ route, navigation }) => {
  const { params } = route;
  const { name, img, imgText } = params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: <Text>{name}</Text>,
    });
  }, [navigation]);

  return (
    <Fragment>
      {img ? (
        <Image
          source={{ uri: img }}
          style={[globalStyle.flex1]}
          resizeMode="contain"
        />
      ) : (
        <View
          style={[globalStyle.containerCentered, { backgroundColor: "gray" }]}
        >
          <Text style={styles.text}>{imgText}</Text>
        </View>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 200,
    fontWeight: "bold",
  },
});

export default ShowFullImg;
