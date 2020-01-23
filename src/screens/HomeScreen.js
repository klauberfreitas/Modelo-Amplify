import React from "react";
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  View
} from "react-native";

// Importa a folha de estilos
import { styles } from "../styles/";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
    headerBackTitle: "Voltar",
    headerTintColor: "#fff",
    headerStyle: {
      backgroundColor: "#242424",
      elevation: 0,
      borderBottomWidth: 0
    }
  };

  // Monta o status bar com cores claras
  componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("light-content");
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.row}>
          <Text style={styles.H1}>Página Inicial</Text>
          <Text style={styles.text}>
            Esta é uma base estilizada. {"\n"}
            Você poderá encontrar os {"\n"}
            componentes em:
          </Text>
          <Text style={styles.H2}>src\components\</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <Text style={styles.buttonTitle}>Dicas</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Desmonta o status bar para que as próximas telas não levem o tema claro
  componentWillUnmount() {
    this._navListener.remove();
  }
}
