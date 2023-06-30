import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, TextInput, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatComponent from "../../components/demo/ChatComponent";
import { styles } from "../../utils/styles";
import { selectEmail, selectLogin } from "../../redux/ducks/user";
import { useReduxSelector } from "../../redux";

const Chat = () => {
    const [chatMessages, setChatMessages] = useState([
        {
            id: `${Math.random()}`,
            text: "Hello guys, welcome!",
            time: "07:50",
            user: "Tomer",
        },
        {
            id: `${Math.random()}`,
            text: "Hi Tomer, thank you! 😇",
            time: "08:50",
            user: "David",
        },
        {
            id: `${Math.random()}`,
            text: "Whats up guys 😇",
            time: "08:50",
            user: "A@b.com",
        },
    ]);
    //const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("");
    const getUsername = useReduxSelector(selectEmail);
    const todoInput = useRef<HTMLInputElement>(null);
    // Set the height of every item of the list, to improve perfomance and later use in the getItemLayout
   const ITEM_HEIGHT = 100;

   // The variable that will hold the reference of the FlatList
   const flatListRef = React.useRef<FlatList>(null);

   // The effect that will always run whenever there's a change to the data
   useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      if (flatListRef.current && chatMessages && chatMessages.length > 0) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };

   }, [chatMessages]);

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
            
            const time = hour + mins;
    
            const newId = `${Math.random()}`;
            const newValue = {
                id: newId,
                text: message,
                time: time,
                user: getUsername!,
            }

            setChatMessages(prevArray => [...prevArray, newValue])
            setMessage("");
            console.log("Message is", message);
            setTimeout(() => {
                const newIdValue = `${Math.random()}`;
                const newValueReceived = {
                    id: newIdValue,
                    text: "Hi Tomer, thank you! 😇",
                    time: time,
                    user: "David",
                }
        
                setChatMessages(prevArray => [...prevArray, newValueReceived])
            }, 5000)
           
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
                            getItemLayout={(data, index) => {
                                    return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index };
                            }}
                            renderItem={({ item }) => (
                                <ChatComponent item={item} username={getUsername} />
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    ) : (
                        ""
                    )}
                </View>
    
                <View style={styles.messaginginputContainer}>
                    <TextInput
                        style={styles.messaginginput}
                        clearButtonMode="always" 
                        value={message}
                        onChangeText={(value) => setMessage(value)}
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
            </View>
        );

}

export default Chat;