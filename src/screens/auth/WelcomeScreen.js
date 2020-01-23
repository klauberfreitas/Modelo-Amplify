import React from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Importa a folha de estilos
import styles from "../../styles/styles";

export default class WelcomeScreen extends React.Component {
  handleRoute = async destination => {
    await this.props.navigation.navigate(destination);
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <View style={styles.row}>
            <Text style={styles.H1}>Bem-vindo</Text>
            <Text style={styles.text}>
              Faça seu login ou {"\n"}
              cadastre-se!
            </Text>

            <TouchableOpacity
              onPress={() => this.handleRoute("SignIn")}
              style={styles.button}
              blurOnSubmit={false}
            >
              <Text style={styles.buttonTitle}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.handleRoute("SignUp")}
              style={styles.buttonOutline}
              blurOnSubmit={false}
            >
              <Text style={styles.buttonTitle}>Cadastrar-se</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.handleRoute("ForgetPassword")}
            >
              <Text style={styles.supportMessage}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

WelcomeScreen.navigationOptions = {
  header: null,
  headerBackTitle: null
};
