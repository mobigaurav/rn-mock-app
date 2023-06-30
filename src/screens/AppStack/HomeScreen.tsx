// File: src/screens/HomeScreen.tsx
import React, { useRef } from 'react'
import { Text, View, StyleSheet, Button, RefreshControl, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import { MainNavigationProp } from '../../routing/types'
import { MainRoutes } from '../../routing/routes'
import { useReduxDispatch } from '../../redux'
import { setLogin, setLogout } from '../../redux/ducks/user'
import LottieView from 'lottie-react-native';
import FabExample from '../../components/demo/Fab'

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

    const handleSubmit= ()=> {navigation.navigate(MainRoutes.Chat)}
    
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