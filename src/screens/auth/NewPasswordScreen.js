import React from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

import { styles, colors } from "../../styles/";

import Auth from "@aws-amplify/auth";

export default class NewPasswordScreen extends React.Component {
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
    newPassword: ""
  };

  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }
  // Request a new password
  async forgotPassword() {
    const { username } = this.state;
    await Auth.forgotPassword(username)
      .then(data => console.log("Novo código enviado", data))
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

  // Upon confirmation redirect the user to the Sign In page
  async forgotPasswordSubmit() {
    const { username, authCode, newPassword } = this.state;
    await Auth.forgotPasswordSubmit(username, authCode, newPassword)
      .then(() => {
        console.log("A nova senha já pode ser usada!");
        Alert.alert("A nova senha já pode ser usada!", [
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("SignIn")
          }
        ]);
      })
      .catch(err => {
        if (!err.message) {
          console.log("Erro ao confirmar a nova senha: ", err);
          Alert.alert("Erro ao confirmar a nova senha: ", err);
        } else {
          console.log("Erro ao confirmar a nova senha: ", err.message);
          Alert.alert("Erro ao confirmar a nova senha: ", err.message);
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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.row}>
              <Text style={styles.H1}>Nova senha</Text>
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
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  blurOnSubmit={true}
                  keyboardType={"email-address"}
                  keyboardAppearance={"dark"}
                  onSubmitEditing={() => {
                    this.thirdInput.focus();
                  }}
                  ref={input => {
                    this.secondInput = input;
                  }}
                  onChangeText={value =>
                    this.onChangeText("newPassword", value)
                  }
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputFlex}
                  placeholder="Código de confirmação"
                  placeholderTextColor={colors.LightBLACK}
                  keyboardType={"phone-pad"}
                  returnKeyType="done"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={false}
                  keyboardAppearance={"dark"}
                  ref={input => {
                    this.thirdInput = input;
                  }}
                  onChangeText={value => this.onChangeText("authCode", value)}
                />
              </View>

              <TouchableOpacity
                onPress={() => this.forgotPasswordSubmit()}
                style={styles.button}
                blurOnSubmit={false}
              >
                <Text style={styles.buttonTitle}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
