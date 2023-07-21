import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
} from "react-native";
import ChatComponent from "../../components/demo/ChatComponent";
import { styles } from "../../utils/styles";
import { selectEmail } from "../../redux/ducks/user";
import { useReduxDispatch, useReduxSelector } from "../../redux";
import { fetchChatData, selectChatReponse, selectStatus } from "../../redux/ducks/chatData";
import { getChatReponse } from "../../redux/ducks/chatData";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LottieView from 'lottie-react-native';

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<any[] | []>([]);
  const [message, setMessage] = useState("");
  const getUsername = useReduxSelector(selectEmail);
  const dispatch = useReduxDispatch();
  const chatStatus = useReduxSelector(selectStatus);
  // The variable that will hold the reference of the FlatList
  const flatListRef = useRef<any>();

  const chatResponse = useReduxSelector(selectChatReponse);
  const lottieSrc = require("../../resources/lottie-loading.json");
  // const chatResponse = (useReduxSelector, state) => {
  //   const memoizedSelector = useMemo(() => selector(state), [state]);
  //   return memoizedSelector;
  // }; 


  useEffect(() => {
    //console.log("Hello message is", message);
    if (chatResponse != "") {
      console.log("chat response is", chatResponse);
      //console.log("chat message is", message);
      const hour =
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : `${new Date().getHours()}`;

      const mins =
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : `${new Date().getMinutes()}`;

      const time = hour + ":" + mins;
      const newIdValue = `${Math.random()}`;
      const newValueReceived = {
        id: newIdValue,
        text: chatResponse,
        time: time,
        user: "Bot",
      };

      setChatMessages((prevArray) => [...prevArray, newValueReceived]);
    }
  }, [chatResponse]);



  const initiateChatCall = () => {
    dispatch(fetchChatData(message));
    setMessage("");
  };

  /*👇🏻 
        This function gets the time the user sends a message, then 
        logs the username, message, and the timestamp to the console.
     */
  const handleNewMessage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    const time = hour + ":" + mins;

    const newId = `${Math.random()}`;
    const newValue = {
      id: newId,
      text: message,
      time: time,
      user: getUsername!,
    };

    setChatMessages((chatMessages) => [...chatMessages, newValue]);
    initiateChatCall();
  };

  return (
      <View style={styles.messagingscreen}>
        <View
          style={[
            styles.messagingscreen,
            { paddingVertical: 15, paddingHorizontal: 10 },
          ]}
        >
          {chatMessages[0] ? (
            <FlatList
              data={chatMessages}
              ref={flatListRef}
              onContentSizeChange={() => flatListRef.current.scrollToEnd()}
              onLayout={() => flatListRef.current.scrollToEnd()}
              renderItem={({ item }) => (
                <ChatComponent item={item} username={getUsername} />
              )}
              keyExtractor={(item) => item.id}
            />
          ) : (
            ""
          )}
        </View>

        {chatStatus == "loading" ? (
          <View>
            <LottieView
                source={lottieSrc}
                loop={true}
                autoPlay
                style={{padding:15, width:'50%', height:90}}
            />
          </View>
        ) : (
          ""
        )}
       <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={90}>
        <View style={styles.messaginginputContainer}>
          <TextInput
            style={styles.messaginginput}
            clearButtonMode="always"
            value={message}
            multiline={true} 
            onChangeText={(value) => {
              if(value.replace(/\s/g,"") != ""){
                setMessage(value) 
              }
              }}
          />

          <TouchableOpacity
            style={styles.messagingbuttonContainer}
            onPress={handleNewMessage}
          >
            <View>
              <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
            </View>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </View>
  );
};

export default Chat;
