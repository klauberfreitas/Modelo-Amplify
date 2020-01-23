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

// Importa a folha de estilos e as cores do aplicativo
import { styles, colors } from "../../styles/";

// Importa o módulo do Amplify
import Auth from "@aws-amplify/auth";

export default class SignInScreen extends React.Component {
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
    password: "",
    fadeIn: new Animated.Value(0),
    fadeOut: new Animated.Value(0),
    isHidden: false
  };
  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }
  // Loga o usuários autenticados
  async signIn() {
    const { username, password } = this.state;
    await Auth.signIn(username, password)
      .then(user => {
        this.setState({ user });
        this.props.navigation.navigate("Authloading");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Erro ao fazer login: ", err);
          Alert.alert("Erro ao fazer login: ", err);
        } else {
          console.log("Erro ao fazer login: ", err.message);
          Alert.alert("Erro ao fazer login: ", err.message);
        }
      });
  }
  // Monta o status bar com o tema escuro
  componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("light-content");
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
            <Text style={styles.H1}>Login</Text>
            <Text style={styles.text}>Faça seu login</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputFlex}
                placeholder="Usuário"
                placeholderTextColor={colors.LightBLACK}
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={false}
                blurOnSubmit={false}
                keyboardType={"default"}
                keyboardAppearance={"dark"}
                onSubmitEditing={() => {
                  this.secondInput.focus();
                }}
                onChangeText={value => this.onChangeText("username", value)}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputFlex}
                placeholder="Senha"
                placeholderTextColor={colors.LightBLACK}
                returnKeyType="go"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                blurOnSubmit={true}
                keyboardType={"email-address"}
                keyboardAppearance={"dark"}
                ref={input => {
                  this.secondInput = input;
                }}
                onChangeText={value => this.onChangeText("password", value)}
              />
            </View>

            <TouchableOpacity
              onPress={() => this.signIn()}
              style={styles.button}
              blurOnSubmit={false}
            >
              <Text style={styles.buttonTitle}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignUp")}
            >
              <Text style={styles.supportMessage}>
                Ainda não tem uma conta?
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
