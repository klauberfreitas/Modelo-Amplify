import React from "react";
import { Animated, StyleSheet, View } from "react-native";

// Carrega a logo
const logo = require(".././assets/images/logo.png");

export default class Logo extends React.Component {
  state = {
    fadeIn: new Animated.Value(0),
    fadeOut: new Animated.Value(0),
    isHidden: false
  };
  // Construção do componente
  componentDidMount() {
    this.fadeIn();
  }
 // Controle do efeito de surgimento 
  fadeIn() {
    Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
    this.setState({ isHidden: true });
  }
   // Controle do efeito de desaparecimento 
  fadeOut() {
    Animated.timing(this.state.fadeOut, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start();
    this.setState({ isHidden: false });
  }

  render() {
    let { fadeOut, fadeIn, isHidden } = this.state; 
    return (
      <View style={styles.container}>
        {/*  Logo */}
        {isHidden ? (
          <Animated.Image
            source={logo}
            style={{ opacity: fadeIn, width: 160, height: 167 }}
          />
        ) : (
          <Animated.Image
            source={logo}
            style={{ opacity: fadeOut, width: 160, height: 167 }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    justifyContent: "center"
  },
  logoContainer: {
    marginBottom: 30
  }
});
