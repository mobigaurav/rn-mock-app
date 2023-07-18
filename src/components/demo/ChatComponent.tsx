import { View, Text } from "react-native";
import React from "react";
// Import vector icons
import { Icon } from "@rneui/themed";
import { styles } from "../../utils/styles";


type ChatProps = {
  item: any;
  username: string | undefined;
};

const ChatComponent = ({ item, username }: ChatProps): React.ReactElement => {
  const status = item.user !== username;

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <View
        style={
          status
            ? styles.mmessageWrapper
            : [styles.mmessageWrapper, { alignItems: "flex-end" }]
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {status ? (
            <Icon
              name="chatbox-ellipses-outline"
              type="ionicon"
              size={30}
              color="black"
              style={styles.mvatar}
            />
          ) : (
            <Icon
              name="user"
              type="font-awesome"
              size={30}
              color="black"
              style={styles.mvatar}
            />
          )}
          <View
            style={
              status
                ? styles.mmessage
                : [styles.mmessage, { backgroundColor: "rgb(194, 243, 194)" }]
            }
          >
            <Text>{item.text}</Text>
          </View>
          
        </View>
        <Text style={{ marginLeft: 40 }}>{item.time}</Text>
      </View>
    </View>
  );
};

export default ChatComponent;
