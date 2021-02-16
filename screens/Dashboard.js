import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { clearAsynStorage, smallDeviceHeight, uuid } from '../asyncStorage';
import Profile from '../asyncStorage/Profile';
import firebase from '../firebase'
import ShowUsers from '../asyncStorage/ShowUsers';
import { deviceHeight } from '../asyncStorage/appStyle';
import StickyHeader from '../asyncStorage/StickyHeader';
import ImagePicker from "react-native-image-crop-picker";

const Dashboard = ({navigation}) => {
const [getScrollPosition, setScrollPosition] = useState(0);
const [userDetail, setUserDetail] = useState({
    id: "",
    name: "",
    profileImg: "",
  });   
const [allUsers, setAllUsers] = useState([]);
const { name, profileImg } = userDetail;

// controlls the header, give the logout button 
    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <SimpleLineIcons
            name="logout"
            size={26}
            color="black"
            style={{ right: 10 }}
            onPress={() =>
              Alert.alert(
                "Logout",
                "Are you sure you want to Logout",
                [
                  {
                    text: "Yes",
                    onPress: () => logout(),
                  },
                  {
                    text: "No",
                  },
                ],
                { cancelable: false }
              )
            }
          />
        ),
      });
    }, [navigation]);

  useEffect(() => {
    try {
      firebase
        .database()
        .ref("users")
        .on("value", (dataSnapshot) => {
          let users = [];
          let currentUser = {
            id: "",
            name: "",
            profileImg: "",
          };
          dataSnapshot.forEach((child) => {
            if (uuid === child.val().uuid) {
              currentUser.id = uuid;
              currentUser.name = child.val().name;
              currentUser.profileImg = child.val().profileImg;
            } else {
              users.push({
                id: child.val().uuid,
                name: child.val().name,
                profileImg: child.val().profileImg,
              });
            }
          });
          // console.log(currentUser);
          // console.log(users);
          setUserDetail(currentUser);
          setAllUsers(users);
        });
    } catch (error) {
      alert(error);
    }
  }, []);

      const selectPhotoTapped = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        }).then((response) => {
          let source = response.path;
          console.log(response);
          UpdateUser(uuid, source)
            // check(PERMISSIONS.IOS.LOCATION_ALWAYS)
            .then(() => {
              setUserDetail({
                ...userDetail,
                profileImg: source,
              });
            })
            .catch((err) => {
              alert(err);
            });        
        });
      };

      const UpdateUser = async (uuid, imgSource) => {
        try {
          return await firebase
            .database()
            .ref("users/" + uuid)
            .update({
              profileImg: imgSource,
            });
        } catch (error) {
          return error;
        }
      };

  // const selectPhotoTapped = () => {
  //   const option = {
  //     storageOptions: {
  //       skipBackup: true,
  //     },
  //   };

  //   ImagePicker.launchImageLibrary(option, (response) => {
  //     if (response.didCancel) {
  //       console.log("user cancel image picker");
  //     } else if (response.error) {
  //       console.log("image picker error", response.error);
  //     } else {
  //       //base 64
  //       let source = "data:image/jpeg;base64," + response.data;
  //       UpdateUser(uuid, source)
  //         // check(PERMISSIONS.IOS.LOCATION_ALWAYS)
  //         .then(() => {
  //           setUserDetail({
  //             ...userDetail,
  //             profileImg: source,
  //           });
  //         })
  //         .catch((err) => {
  //           alert(err);
  //         });
  //     }
  //   });
  // };
    const imgTaP = (profileImg, name) => {
      if (!profileImg) {
        navigation.navigate("ShowFullImg", {
          name,
          imgText: name.charAt(0),
        });
      } else {
        navigation.navigate("ShowFullImg", {
          name,
          img: profileImg,
        });
      }
    };

    const nameTap = (profileImg, name, guestUserId) => {
      if (!profileImg) {
        navigation.navigate("Chat", {
          name,
          imgText: name.charAt(0),
          guestUserId,
          currentUserId: uuid,
        });
      } else {
        navigation.navigate("Chat", {
          name,
          img: profileImg,
          guestUserId,
          currentUserId: uuid,
        });
      }
    };


const LogoutUser = async () => {
  try {
    return await firebase.auth().signOut();
  } catch (error) {
    return error;
  }
};

    const logout = () => {
      LogoutUser()
        .then(() => {
          clearAsynStorage()
            .then(() => {})
            .catch((err) => alert(err));
          navigation.replace("Login");
        })
        .catch((err) => alert(err));
    };

    const getOpacity = () => {
      if (deviceHeight > smallDeviceHeight) {
        return deviceHeight / 4;
      } else {
        return deviceHeight / 6;
      }
    };


    return (
      <SafeAreaView>
        {getScrollPosition > getOpacity() && (
          <StickyHeader
            name={name}
            img={profileImg}
            onImgTap={() => imgTaP(profileImg, name)}
          />
        )}
        <FlatList
          alwaysBounceVertical={false}
          data={allUsers}
          keyExtractor={(_, index) => index.toString()}
          onScroll={(event) =>
            setScrollPosition(event.nativeEvent.contentOffset.y)
          }
          ListHeaderComponent={
            <View
              style={{
                opacity:
                  getScrollPosition < getOpacity()
                    ? (getOpacity() - getScrollPosition) / 100
                    : 0,
              }}
            >
              <Profile
                name={name}
                img={profileImg}
                onEditImgTap={() => selectPhotoTapped()}
                onImgTap={() => imgTaP(profileImg, name)}
              />
            </View>
          }
          renderItem={({ item }) => (
            <ShowUsers
              name={item.name}
              img={item.profileImg}
              onImgTap={() => imgTaP(item.profileImg, item.name)}
              onNameTap={() => nameTap(item.profileImg, item.name, item.id)}
            />
          )}
        />
      </SafeAreaView>
    );
}

export default Dashboard

const styles = StyleSheet.create({})
