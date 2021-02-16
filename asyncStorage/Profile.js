import React from 'react'
import { StyleSheet, Text, View, Image } from "react-native";
// import { Image } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import globalStyle from './globalStyle';
import styles from './ProfileStyles'

const Profile = ({ name, img, onImgTap, onEditImgTap }) => (
  <View style={[globalStyle.sectionCentered, styles.container]}>
    <View style={styles.imgContainer}>
      <TouchableOpacity onPress={onImgTap} activeOpacity={0.8}>
        {img ? (
          <Image source={{ uri: img }} style={styles.img} resizeMode="cover" />
        ) : (
          <View
            style={[
              globalStyle.sectionCentered,
              styles.img,
              { backgroundColor: "rgb(173,216,230)" },
            ]}
          >
            <Text style={styles.name}>{name.charAt(0)}</Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={[globalStyle.sectionCentered, styles.editImgContainer]}>
        <FontAwesome5Icon
          name="user-edit"
          size={20}
          onPress={onEditImgTap}
          color= 'white'
        />
      </View>
    </View>
    <Text style={styles.welcome}>{name}</Text>
  </View>
);




export default Profile


