import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";

// Importa a folha de estilos
import { styles } from "../styles/";

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Dicas",
    headerBackTitle: "Voltar",
    headerTintColor: "#000"
  };
  // Monta o status bar com cores claras
  componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("dark-content");
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.row}>
          <Text style={styles.H1}>
            Profile {"\n"}
            Screen
          </Text>
          <Text style={styles.text}>
            Para alterar as configurações do "Stack". {"\n"}
            Edite o arquivo:
          </Text>
          <Text style={styles.H2}>
            MainTabNavigator em: {"\n"} /src/navigation/
          </Text>
        </View>
      </View>
    );
  }
}
