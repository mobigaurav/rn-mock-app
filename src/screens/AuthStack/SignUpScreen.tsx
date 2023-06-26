// File: src/screens/SignInScreen.tsx | SignUpScreen.ts
import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { MainNavigationProp } from '../../routing/types'
import { MainRoutes } from '../../routing/routes'
import { useReduxDispatch } from '../../redux'
import { attemptSignUp, setLogin } from '../../redux/ducks/user'
import UserForm from '../../components/demo/UserForm'

type SignInScreenProps = {
    navigation: MainNavigationProp<MainRoutes.SignIn>
}
const SignInScreen = ({ navigation }: SignInScreenProps): React.ReactElement => {
    const dispatch = useReduxDispatch()

    const handleSubmit = (email: string, password: string): void => {
        dispatch(attemptSignUp(email, password))
    }

    return (
        <View style={styles.page}>
            <Text>Sign up</Text>
            <UserForm submitHandler={handleSubmit} label="Sign Up" />
            <Button title="Sign In" onPress={() => navigation.navigate(MainRoutes.SignIn)} />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default SignInScreen