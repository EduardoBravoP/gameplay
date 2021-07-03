import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  image: {
    width: 62,
    height: 66,
  },
  container: {
    borderRadius: 8,
    width: 62,
    height: 66,
    backgroundColor: theme.colors.discord,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: "hidden"
  }
})