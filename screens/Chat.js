import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, FlatList, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { colors } from 'react-native-elements';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import styles from '../asyncStorage/ChatStyles';
import globalStyle from '../asyncStorage/globalStyle';
import firebase from '../firebase'
import ChatBox from '../asyncStorage/ChatBox'
import ImagePicker from "react-native-image-crop-picker";
// import ImagePicker from "react-native-image-picker";
// import handleCamera from './ImagePicker'

const Chat = ({route, navigation}) => {
  const { params } = route;
  const { name, img, imgText, guestUserId, currentUserId } = params;
  const [msgValue, setMsgValue] = useState("");
  const [messeges, setMesseges] = useState([]);

  // console.log(messeges);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: <Text>{name}</Text>,
    });
  }, [navigation]);

 const senderMsg = async (
    msgValue,
    currentUserId,
    guestUserId,
    img
  ) => {
    try {
      return await firebase
        .database()
        .ref("messeges/" + currentUserId)
        .child(guestUserId)
        .push({
          messege: {
            sender: currentUserId,
            reciever: guestUserId,
            msg: msgValue,
            img: img,
          },
        });
    } catch (error) {
      return error;
    }
  };

   const recieverMsg = async (
    msgValue,
    currentUserId,
    guestUserId,
    img
  ) => {
    try {
      return await firebase
        .database()
        .ref("messeges/" + guestUserId)
        .child(currentUserId)
        .push({
          messege: {
            sender: currentUserId,
            reciever: guestUserId,
            msg: msgValue,
            img: img,
          },
        });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    try {
      firebase
        .database()
        .ref("messeges")
        .child(currentUserId)
        .child(guestUserId)
        .on("value", (dataSnapshot) => {
          let msgs = [];
          dataSnapshot.forEach((child) => {
            // console.log(child);
            msgs.push({
              sendBy: child.val().messege.sender,
              recievedBy: child.val().messege.reciever,
              msg: child.val().messege.msg,
              img: child.val().messege.img,
            });
          });
          // console.log(msgs);
          setMesseges(msgs.reverse());
          // console.log(msgs);
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  const handleSend = () => {
    setMsgValue("");
    if (msgValue) {
      senderMsg(msgValue, currentUserId, guestUserId, "")
        .then(() => {})
        .catch((err) => alert(err));

      // * guest user

      recieverMsg(msgValue, currentUserId, guestUserId, "")
        .then(() => {})
        .catch((err) => alert(err));
    }
  };

    const handleCamera = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then((response) => {
        console.log(response);
        let source = response.path;

        senderMsg(msgValue, currentUserId, guestUserId, source)
          .then(() => {})
          .catch((err) => alert(err));

        // * guest user

        recieverMsg(msgValue, currentUserId, guestUserId, source)
          .then(() => {})
          .catch((err) => alert(err));
      });
    };

    // const handleCamera = () => {
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
    //       setMsgValue("");
    //       if (msgValue) {
    //         senderMsg(msgValue, currentUserId, guestUserId, source)
    //           .then(() => {})
    //           .catch((err) => alert(err));

    //         // * guest user

    //         recieverMsg(msgValue, currentUserId, guestUserId, source)
    //           .then(() => {})
    //           .catch((err) => alert(err));
    //       }
    //     }
    //   });
    // };
  const handleOnChange = (text) => {
    setMsgValue(text);
  };
  // console.log(messeges);

  const imgTaP = (chatImg) => {
    navigation.navigate("ShowFullImg", { name, img: chatImg });
  };


    
    return (
      <SafeAreaView
        //makes the background black and then go to the styles page of chat and you can change the white background to something else
        style={[globalStyle.flex1, { backgroundColor: colors.black }]}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={90}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[globalStyle.flex1]}
        >
          <TouchableWithoutFeedback
            style={[globalStyle.flex1]}
            onPress={Keyboard.dismiss}
          >
            <>
              <FlatList
                inverted
                data={messeges}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <>
                    {/* {console.log(messeges)}; */}
                    <ChatBox
                      msg={item.msg}
                      userId={item.sendBy}
                      img={item.img}
                      onImgTap={() => imgTaP(item.img)}
                    />
                  </>
                )}
              />
              {/* sending messege/ */}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  padding: 15,
                }}
              >
                <TextInput
                  style={{
                    //   put it to the bottom and give the text height 40
                    bottom: 0,
                    height: 40,
                    flex: 1,
                    // seperate the arrow and the text area
                    marginRight: 15,
                    // make the tex border transparent and the background grey
                    borderColor: "transparent",
                    backgroundColor: "#ECECEC",
                    // dont be so cramped
                    padding: 10,
                    // make the text color blue
                    color: "blue",
                    borderRadius: 30,
                  }}
                  placeholder="Type Here"
                  numberOfLines={10}
                  inputStyle={styles.input}
                  value={msgValue}
                  onChangeText={(text) => handleOnChange(text)}
                  onSubmitEditing={() => handleSend()}
                />
                <TouchableOpacity>
                  <SimpleLineIcons
                    name="camera"
                    size={24}
                    color="#2B68E6"
                    onPress={handleCamera}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <SimpleLineIcons
                    style={{ padding: 5 }}
                    name="bubbles"
                    size={24}
                    color="#2B68E6"
                    onPress={() => handleSend()}
                    onSubmitEditing={() => handleSend()}
                  />
                </TouchableOpacity>
              </View>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
}

export default Chat
