import React from "react";
import {
  Alert,
  Animated,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  View
} from "react-native";
import Modal from "react-native-modal";

// Importa a folha de estilos
import { styles, colors } from "../../styles/";

import Auth from "@aws-amplify/auth";

import data from "../../constant/countriesData";

const defaultFlag = data.filter(obj => obj.name === "Brazil")[0].flag;
const defaultCode = data.filter(obj => obj.name === "Brazil")[0].dial_code;

export default class SignUpScreen extends React.Component {
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
    email: "",
    phoneNumber: "",
    fadeIn: new Animated.Value(0), // Initial value for opacity: 0
    fadeOut: new Animated.Value(1), // Initial value for opacity: 1
    isHidden: false,
    flag: defaultFlag,
    modalVisible: false,
    modal2Visible: false,
    authCode: ""
  };

  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setModal2Visible(visible) {
    this.setState({ modal2Visible: visible });
  }

  componentDidMount() {
    this.fadeIn();
  }
  fadeIn() {
    Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
    this.setState({ isHidden: true });
  }
  fadeOut() {
    Animated.timing(this.state.fadeOut, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start();
    this.setState({ isHidden: false });
  }

  showModal() {
    this.setState({ modalVisible: true });
  }
  hideModal() {
    this.setState({ modalVisible: false });
  }
  async getCountry(country) {
    const countryData = await data;
    try {
      const countryCode = await countryData.filter(
        obj => obj.name === country
      )[0].dial_code;
      const countryFlag = await countryData.filter(
        obj => obj.name === country
      )[0].flag;

      this.setState({ phoneNumber: countryCode, flag: countryFlag });
      await this.hideModal();
    } catch (err) {
      console.log(err);
    }
  }

  async signUp() {
    const { username, password, email, phoneNumber } = this.state;
    const phone_number = phoneNumber;
    await Auth.signUp({
      username,
      password,
      attributes: { email, phone_number }
    })
      .then(() => {
        console.log("Login bem sucedido!");
        this.setModal2Visible(true);
      })
      .catch(err => {
        if (!err.message) {
          console.log("Erro ao efeturar o login: ", err);
          Alert.alert("Erro ao efeturar o login: ", err);
        } else {
          console.log("Erro ao efeturar o login: ", err.message);
          Alert.alert("Erro ao efeturar o login: ", err.message);
        }
      });
  }

  async confirmSignUp() {
    const { username, authCode } = this.state;
    await Auth.confirmSignUp(username, authCode)
      .then(() => {
        console.log("Cadastro realizado com sucesso");
        this.setModal2Visible(false);
        this.props.navigation.navigate("SignIn");
        Alert.alert("Cadastro realizado com sucesso");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Erro ao inserir o código de confirmação: ", err);
          Alert.alert("Erro ao inserir o código de confirmação: ", err);
        } else {
          console.log("Erro ao inserir o código de confirmação: ", err.message);
          Alert.alert("Erro ao inserir o código de confirmação: ", err.message);
        }
      });
  }

  async resendSignUp() {
    const { username } = this.state;
    await Auth.resendSignUp(username)
      .then(() => {
        console.log("Código de confirmação reenviado com sucesso!");
        Alert.alert(
          "Código de confirmação reenviado",
          "Verifique sua caixa de entrada novamente!"
        );
      })
      .catch(err => {
        if (!err.message) {
          console.log("Erro ao solicitar novo código de confirmação: ", err);
          Alert.alert("Erro ao solicitar novo código de confirmação: ", err);
        } else {
          console.log(
            "Erro ao solicitar novo código de confirmação: ",
            err.message
          );
          Alert.alert(
            "Erro ao solicitar novo código de confirmação: ",
            err.message
          );
        }
      });
  }
  render() {
    let { fadeOut, fadeIn, isHidden, flag } = this.state;
    const countryData = data;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <View style={styles.row}>
            <Text style={styles.H1}>Cadastrar</Text>
            <Text style={styles.text}>Crie sua nova conta</Text>
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
                onChangeText={value => this.onChangeText("password", value)}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputFlex}
                placeholder="Email"
                placeholderTextColor={colors.LightBLACK}
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={false}
                blurOnSubmit={true}
                keyboardType={"email-address"}
                keyboardAppearance={"dark"}
                onSubmitEditing={() => {
                  this.fourthInput.focus();
                }}
                ref={input => {
                  this.thirdInput = input;
                }}
                onChangeText={value => this.onChangeText("email", value)}
              />
            </View>

            <Text onPress={() => this.showModal()} style={{ fontSize: 40 }}>
              {flag}
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputFlex}
                placeholder="+55 0000-0000"
                placeholderTextColor={colors.LightBLACK}
                keyboardType={"phone-pad"}
                returnKeyType="done"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={false}
                value={this.state.phoneNumber}
                keyboardAppearance={"dark"}
                ref={input => {
                  this.fourthInput = input;
                }}
                onChangeText={val => {
                  if (this.state.phoneNumber === "") {
                    // Cria a bandeira do Brasil por padrão
                    this.onChangeText("phoneNumber", defaultCode + val);
                  } else {
                    // Renderiza o código do país com base na escolha do usuáiro no modal
                    this.onChangeText("phoneNumber", val);
                  }
                }}
              />
            </View>

            <Modal
              animationType="slideInUp" // fade
              visible={this.state.modalVisible}
            >
              <View style={styles.modal}>
                <FlatList
                  data={countryData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableWithoutFeedback
                      onPress={() => this.getCountry(item.name)}
                    >
                      <View style={styles.flagContainer}>
                        <Text style={styles.flagIcon}>{item.flag}</Text>
                        <Text style={styles.flagText}>
                          {item.name} ({item.dial_code})
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                />
                <TouchableOpacity
                  onPress={() => this.hideModal()}
                  style={styles.buttonModal}
                >
                  <Text style={styles.buttonTitle}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <TouchableOpacity
              onPress={() => this.signUp()}
              style={styles.button}
              blurOnSubmit={false}
            >
              <Text style={styles.buttonTitle}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignIn")}
            >
              <Text style={styles.supportMessage}>Já tem uma conta?</Text>
            </TouchableOpacity>

            <Modal animationType="slide" visible={this.state.modal2Visible}>
              <View style={styles.modalConfirm}>
                <View style={styles.row}>
                  <Text style={styles.modalTitle}>
                    Código de{"\n"}confirmação
                  </Text>
                  <Text style={styles.text}>
                    Digite o código que foi enviado para o email cadastrado.
                  </Text>
                  <View style={styles.inputModal}>
                    <TextInput
                      style={styles.inputFlexModal}
                      placeholder="000000"
                      maxLength={6}
                      placeholderTextColor={colors.LightBLACK}
                      returnKeyType="done"
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType={"phone-pad"}
                      keyboardAppearance={"dark"}
                      onChangeText={value =>
                        this.onChangeText("authCode", value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => this.confirmSignUp()}
                    style={styles.buttonModal}
                    blurOnSubmit={false}
                  >
                    <Text style={styles.buttonTitle}>Confirmar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setModal2Visible(!this.state.modal2Visible);
                    }}
                    style={styles.buttonModalOutline}
                  >
                    <Text style={styles.buttonTitle}>Fechar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.resendSignUp()}>
                    <Text style={styles.supportMessage}>
                      Não recebeu? Reenviar código!
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            {/*  
          APENAS PARA DESENVOLVIMENTO - Botão para configuração do modal de confirmação
          <TouchableHighlight
              onPress={() => {
                this.setModal2Visible(true);
              }}
            >
              <Text>Mostrar modal</Text>
            </TouchableHighlight>  */}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
