import { CardItem, Card } from 'native-base';
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './ChatBoxStyles';
import { uuid } from './index';
import deviceWidth from './appStyle'

const ChatBox = ({ userId, msg, img, onImgTap }) => {
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
            borderTopLeftRadius: 20,
            borderTopRightRadius: 0,
            // backgroundColor: color.DARK_GRAY,
          },
        ]}
      >
        {img ? (
          <CardItem cardBody>
            <TouchableOpacity onPress={onImgTap}>
              <Image
                source={{ uri: img }}
                resizeMode="cover"
                style={{ height: 200, width: 200, }}
              />
            </TouchableOpacity>
          </CardItem>
        ) : (
          <Text style={[styles.chatTxt, isCurrentUser && { color: "black" }]}>
            {msg}
          </Text>
        )}
      </View>
    </Card>
  );
};

export default ChatBox;