import { StyleSheet } from "react-native";
/* Importa as cores do aplicativo. As declare como: COLORS.NOMEDACOR */

import colors from "./colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT,
    justifyContent: "center",
  },
  row: {
    alignItems: "center"
  },
  H1: {
    textAlign: "center",
    fontSize: 48,
    textTransform: "uppercase",
    color: colors.WHITE,
  },
  H2: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff"
  },
  text: {
    marginVertical: 10,
    textAlign: "center",
    fontSize: 14,
    color: colors.WHITE,
  },
  inputContainer: {
    paddingHorizontal: 20,
    height: 42,
    width: "80%",
    borderRadius: 5,
    justifyContent: "center",
    backgroundColor: colors.WHITE_OPAQUE,
    margin: 5
  },
  input: {
    paddingHorizontal: 20,
    height: 42,
    width: "80%",
    marginTop: 5,
    borderColor: null,
    borderWidth: 0,
    color: "#fff",
    fontSize: 18,
    borderRadius: 5,
    backgroundColor: colors.WHITE_OPAQUE,
  },
  inputFlex: {
    color: colors.BLACK_OPAQUE,
    fontSize: 16,
  },
 supportMessage: {
    color: colors.WHITE,
    fontSize: 14,
    marginTop: 15,
    marginBottom: 10,
    textDecorationLine: "underline",
    textDecorationColor: colors.WHITE_OPAQUE,
  },
  buttonTitle: {
    color: colors.WHITE,
    fontSize: 18
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 45,
    marginTop: 30,
    backgroundColor: colors.RED,
    borderRadius: 30,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: "red",
    shadowOffset: { height: 1, width: 1 }
  },  
  buttonOutline: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 45,
    marginTop: 15,
    borderWidth: 1,
    borderColor: colors.RED,
    borderRadius: 30,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: colors.RED,
  },
  buttonModal: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 45,
    marginVertical: 10,
    backgroundColor: colors.RED,
    borderRadius: 30,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: "red",
    shadowOffset: { height: 1, width: 1 }
  },  
  buttonModalOutline: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 45,
    marginTop: 15,
    borderWidth: 1,
    borderColor: colors.RED,
    borderRadius: 30,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: colors.RED,
  },  
  logoContainer: {
    marginBottom: 30
  },
  modal: {
    marginTop: 80,
    marginBottom: 30,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: colors.BLACK,
  },
  modalConfirm: {
    marginTop: 80,
    padding: 40,
    marginBottom: 50,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: colors.BLACK,
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 36,
    textTransform: "uppercase",
    color: colors.WHITE,
    marginTop: 30,
  },
  inputFlexModal: {
    color: colors.BLACK_OPAQUE,
    fontSize: 16,
    letterSpacing: 10,
  },
  inputModal: {
    paddingHorizontal: 20,
    height: 42,
    width: "100%",
    borderColor: null,
    borderWidth: 0,
    color: "#fff",
    fontSize: 18,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: colors.WHITE_OPAQUE,
    justifyContent: "center",
    alignItems: "center"
  },
  flagContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flagIcon: {
  fontSize: 45,
  },
  flagText: {
    fontSize: 16,
    color: colors.WHITE,
  },
    
});

export default styles;
