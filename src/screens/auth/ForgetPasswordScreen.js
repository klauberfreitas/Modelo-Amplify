import React from "react";
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { styles, colors } from "../../styles/";

import Auth from "@aws-amplify/auth";

export default class ForgetPasswordScreen extends React.Component {
  static navigationOptions = {
    title: null,
    headerBackTitle: "Voltar",
    headerTintColor: "#fff",
    headerStyle: {
      backgroundColor: "#242424",
      elevation: 0,
      borderBottomWidth: 0
    }
  };
  state = {
    username: "",
    authCode: "",
    fadeIn: new Animated.Value(0),
    fadeOut: new Animated.Value(0),
    isHidden: false
  };

  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }

  // Requisição de nova senha
  async forgotPassword() {
    const { username } = this.state;
    await Auth.forgotPassword(username)
      .then(() => {
        console.log("sign up successful!");
        Alert.alert(
          "Novo código enviado!",
          "Verifique o código que lhe foi enviado por email.",
          [
            {
              text: "OK",
              onPress: () => this.props.navigation.navigate("NewPassword")
            }
          ]
        );
      })
      .catch(err => {
        if (!err.message) {
          console.log("Erro ao configurar a nova senha: ", err);
          Alert.alert("Erro ao configurar a nova senha: ", err);
        } else {
          console.log("Erro ao configurar a nova senha: ", err.message);
          Alert.alert("Erro ao configurar a nova senha: ", err.message);
        }
      });
  }
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
            <Text style={styles.H1}>Cadastrar Nova Senha</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputFlex}
                placeholder="Usuário"
                placeholderTextColor={colors.LightBLACK}
                returnKeyType="done"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={false}
                blurOnSubmit={false}
                keyboardType={"default"}
                keyboardAppearance={"dark"}
                onChangeText={value => this.onChangeText("username", value)}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.forgotPassword()}
              style={styles.button}
              blurOnSubmit={false}
            >
              <Text style={styles.buttonTitle}>Enviar código</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
