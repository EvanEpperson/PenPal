import { CardItem, Card } from 'native-base';
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './ChatBoxStyles';
import { uuid } from './index';
import deviceWidth from './appStyle'

const ChatBox = ({ userId, msg, img, onImgTap, sendBy }) => {
  let isCurrentUser = userId === uuid ? true : false;
  // alert(msg)
  return (
    <Card
      transparent
      // style={{
      //   maxWidth: deviceWidth / 2 + 10,
      //   alignSelf: isCurrentUser ? "flex-end" : "flex-start",
      // }}
    >
      <View
        style={[
          styles.chatContainer,
          isCurrentUser && {
            padding: 15,
            backgroundColor: "#ECECEC",
            alignSelf: "flex-end",
            borderRadius: 20,
            marginRight: 15,
            marginBottom: 0,
            maxWidth: "80%",
            position: "relative",
            backgroundColor: "#147efb",
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 0,
          },
        ]}
      >
        {img ? (
          <CardItem cardBody>
            <TouchableOpacity onPress={onImgTap}>
              <Image
                source={{ uri: img }}
                resizeMode="cover"
                style={{ height: 200, width: 200 }}
              />
            </TouchableOpacity>
          </CardItem>
        ) : (
          <Text
            style={[
              styles.chatTxt,
              isCurrentUser && {
                color: "white",
                fontWeight: "500",
                marginLeft: 10,
              },
            ]}
          >
            {msg}
          </Text>
        )}
      </View>
    </Card>
  );
};

export default ChatBox;