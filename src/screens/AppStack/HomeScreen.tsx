// File: src/screens/HomeScreen.tsx
import React, { useCallback, useRef } from 'react'
import { Text, View, StyleSheet, Button, RefreshControl, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import { Linking } from 'react-native'
import { MainNavigationProp } from '../../routing/types'
import { MainRoutes } from '../../routing/routes'
import { useReduxDispatch } from '../../redux'
import { setLogin, setLogout } from '../../redux/ducks/user'
import LottieView from 'lottie-react-native';
import FabExample from '../../components/demo/Fab';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

type HomeScreenProps = {
    navigation: MainNavigationProp<MainRoutes.Home>
}
const HomeScreen = ({ navigation }: HomeScreenProps): React.ReactElement => {
    const dispatch = useReduxDispatch()
    const logoutHandler = () => dispatch(setLogout())
    const refreshAnimation = require('../../resources/lottie_refresh.json');
    const [refreshing, setRefreshing] = React.useState(false);
    const lottieRef = useRef<LottieView>(null);
    const url = 'http://127.0.0.1:8080/chat.html'
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
        setRefreshing(false);
        }, 2000);
    }, []);

    //const handleSubmit= ()=> {navigation.navigate(MainRoutes.Chat)}

    const handleSubmit=  useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);
        const isAvailable = await InAppBrowser.isAvailable()
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          if (isAvailable) {
            const result = await InAppBrowser.open(url, {
                // iOS Properties
                dismissButtonStyle: 'cancel',
                preferredBarTintColor: '#453AA4',
                preferredControlTintColor: 'white',
                readerMode: true,
                animated: false,
                modalPresentationStyle: 'fullScreen',
                modalTransitionStyle: 'coverVertical',
                modalEnabled: true,
                enableBarCollapsing: true,
                // Android Properties
                showTitle: true,
                toolbarColor: '#6200EE',
                secondaryToolbarColor: 'black',
                navigationBarColor: 'black',
                navigationBarDividerColor: 'white',
                enableUrlBarHiding: true,
                enableDefaultShare: true,
                forceCloseOnRedirection: false,
                // Specify full animation resource identifier(package:anim/name)
                // or only resource name(in case of animation bundled with app).
                animations: {
                  startEnter: 'slide_in_right',
                  startExit: 'slide_out_left',
                  endEnter: 'slide_in_left',
                  endExit: 'slide_out_right'
                }
              })
          }else Linking.openURL(url)
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
      }, [url]);

    //const handleSubmit=   ()=> {
        //const isAvailable =  await InAppBrowser.isAvailable()
        //const url = 'http://127.0.0.1:8080/chat.html'
        // if (isAvailable) {
        //   InAppBrowser.open(url, {
        //     // iOS Properties
        //     dismissButtonStyle: 'cancel',
        //     preferredBarTintColor: 'gray',
        //     preferredControlTintColor: 'white',
        //     // Android Properties
        //     showTitle: true,
        //     toolbarColor: '#6200EE',
        //     secondaryToolbarColor: 'black',
        //     enableUrlBarHiding: true,
        //     enableDefaultShare: true,
        //     forceCloseOnRedirection: true,
        //   }).then((result) => {
        //     Alert.alert(JSON.stringify(result))
        //   })
        // } else Linking.openURL(url)
        //InAppBrowser.mayLaunchUrl(url, []);
       // Linking.openURL(url)

    //}
    
    return (
        <SafeAreaView style={styles.page}>
             <FabExample title= "Chat" submitHandler={handleSubmit}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    }
})

export default HomeScreen