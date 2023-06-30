// File: src/screens/SplashScreen.tsx
import React, { useCallback } from 'react'
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { useReduxDispatch } from '../../redux'
import { setLogin } from '../../redux/ducks/user'
import { useFocusEffect } from '@react-navigation/native'
import { MainRoutes } from '../../routing/routes'
import { MainNavigationProp } from '../../routing/types'
import LottieView from 'lottie-react-native';

type SplashScreenProps = {
    navigation: MainNavigationProp<MainRoutes.Splash>
}

const SplashScreen = ({ navigation }: SplashScreenProps): React.ReactElement => {
    const navigate = useCallback(
        () => navigation.navigate(MainRoutes.AppCheck),
        [navigation],
    )

    const lottieSrc = require("../../resources/lottie_refresh.json");

    useFocusEffect(
        useCallback(() => {
            const navigationTimer = setTimeout(() => {
                navigate()
            }, 3000)

            return (): void => clearTimeout(navigationTimer)
        }, [navigate]),
    )

    return (
        <TouchableWithoutFeedback onPress={() => navigate()}>
             <View style={styles.page}>
                <View style={styles.footer}>
                <LottieView
                source={lottieSrc}
                loop={false}
                autoPlay
            />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#2C5364',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleBox: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentBox: {
        width: '100%',
        height: '45%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        width: '100%',
        height: '10%',
        paddingRight: '3%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
})

export default SplashScreen