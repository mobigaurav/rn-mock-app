// File: src/screens/HomeScreen.tsx
import React, { useRef } from 'react'
import { Text, View, StyleSheet, Button, RefreshControl, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { MainNavigationProp } from '../../routing/types'
import { MainRoutes } from '../../routing/routes'
import { useReduxDispatch } from '../../redux'
import { setLogin, setLogout } from '../../redux/ducks/user'
import LottieView from 'lottie-react-native';
import { FloatingAction } from "react-native-floating-action";

type HomeScreenProps = {
    navigation: MainNavigationProp<MainRoutes.Home>
}
const HomeScreen = ({ navigation }: HomeScreenProps): React.ReactElement => {
    const dispatch = useReduxDispatch()
    const logoutHandler = () => dispatch(setLogout())
    const refreshAnimation = require('../../resources/lottie_refresh.json');
    const [refreshing, setRefreshing] = React.useState(false);
    const lottieRef = useRef<LottieView>(null);
  
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
        setRefreshing(false);
        }, 2000);
    }, []);
    return (
        <SafeAreaView style={styles.page}>
        <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {/* <Text>HOME</Text>
            <Button title="logout" onPress={() => logoutHandler()} />
            <Button title="settings" onPress={() => navigation.navigate(MainRoutes.Settings)} /> */}
             <FloatingAction
                onPressItem={name => {
                console.log(`selected button: ${name}`);
                }}
            />
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
      },
      // 3. Create a new style
  lottieView: {
    height: 100,
    alignSelf: 'center',
  },
})

export default HomeScreen