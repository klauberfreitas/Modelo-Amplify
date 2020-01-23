import React from "react";
import {
  TouchableOpacity,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  View,
  Alert,
  TextInput
} from "react-native";

//Importar a folha de estilo e as cores do aplicativo
import { styles, colors } from "../styles/";

import Icon from "react-native-vector-icons/FontAwesome";

// Ícones alternativos
//import { Ionicons } from "@expo/vector-icons";

//Importa o módulo do Amplify
import Auth from "@aws-amplify/auth";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Configurações",
    headerBackTitle: "Voltar",
    headerTintColor: "#000"
  };
  state = {
    password1: "",
    password2: ""
  };
  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }
  // Altera a senha do usuário
  changePassword = async () => {
    const { password1, password2 } = this.state;
    await Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, password1, password2);
      })
      .then(data => {
        console.log("Senha alterada com sucesso!", data); //Apenas para produção
        Alert.alert("Senha alterada com sucesso");
      })
      .catch(err => {
        console.log("Um erro ocorreu: ", err); //Apenas para produção
        Alert.alert("Um erro ocorreu: ", err.message); // Mostra a mensagem de erro ao usuário
      });
  };
  // Sai do aplicativo
  signOutAlert = async () => {
    await Alert.alert(
      "Desconectar?",
      "Você tem certeza de que quer sair?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.signOut() }
      ],
      { cancelable: false }
    );
  };
  signOut = async () => {
    await Auth.signOut()
      .then(() => {
        console.log("Desconetado com sucesso");
        this.props.navigation.navigate("Authloading");
      })
      .catch(err => console.log("Erro ao desconectar", err));
  };
  // Monta o status bar com o tema escuro
  componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("dark-content");
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <View style={styles.row}>
            <Text style={styles.H1}>Resetar Senha</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputFlex}
                placeholder="Senha antiga"
                placeholderTextColor={colors.LightBLACK}
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                blurOnSubmit={false}
                keyboardAppearance={"dark"}
                onSubmitEditing={() => {
                  this.secondInput.focus();
                }}
                onChangeText={value => this.onChangeText("password1", value)}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputFlex}
                ref={input => {
                  this.secondInput = input;
                }}
                placeholder="Senha nova"
                placeholderTextColor={colors.LightBLACK}
                returnKeyType="done"
                autoCapitalize="none"
                keyboardAppearance={"dark"}
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={value => this.onChangeText("password2", value)}
              />
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ForgetPassword")}
            >
              <Text style={styles.supportMessage}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.changePassword}
              style={styles.button}
              blurOnSubmit={false}
            >
              <Text style={styles.buttonTitle}>Resetar senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.signOutAlert}
              style={styles.buttonOutline}
            >
              <Icon
                name="sign-out"
                style={{ color: "#de4a3d", fontSize: 30 }}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
