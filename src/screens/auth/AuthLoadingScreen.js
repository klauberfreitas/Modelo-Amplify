import React from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native'

//Importa o módulo do Amplify
import Auth from '@aws-amplify/auth'

export default class AuthLoadingScreen extends React.Component {
  state = {
    userToken: null
  }
  async componentDidMount () {
    await this.loadApp()
  }
  // Carrega o aplicativo e grava os usuários "logados"
  loadApp = async () => {
    await Auth.currentAuthenticatedUser()
    .then(user => {
      this.setState({userToken: user.signInUserSession.accessToken.jwtToken})
    })
    .catch(err => console.log(err))
    this.props.navigation.navigate(this.state.userToken ? 'App' : 'Auth')
  }
  render() {
    return (
      <View style={styles.container}> 
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
