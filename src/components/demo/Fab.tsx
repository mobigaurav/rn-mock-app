
import React, { useState } from 'react';
import { View, StyleSheet, Alert, Button } from 'react-native';
import { FAB, Icon } from '@rneui/themed';

type FabProps = {
  submitHandler:() => void
  title:string
}

const FabExample = ({submitHandler, title}:FabProps):React.ReactElement => {
  const [text, setText] = useState('');
  const [showText, setShowText] = useState(false);
  const [disablebtn, setDisablebtn] = useState(true);
  const [visible, setVisible] = useState(true);

  const addItem = () => {
    setShowText(true);
  };
  const showAlert = () => {
    Alert.alert('Item added successfully');
  };
  
  return (
    <View style={{
      alignItems: 'center',
      paddingVertical: 5,
      flexGrow: 1,
    }}>
    <FAB
        visible={visible}
        title={title}
        placement="right"
        onPress={() => submitHandler()}
        icon={{
          name: 'message-square',
          type: 'feather',
          size: 15,
          color: 'white',
        }}
      />
    </View>
  );
};
  
export default FabExample;
  
