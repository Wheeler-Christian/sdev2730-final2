import { StyleSheet, Text } from "react-native";

function Favorites() {
  return <Text style={styles.text}>The favorites screen</Text>;
}

export default Favorites;

const styles = StyleSheet.create({
  text: {
    color: "white",
    margin: 2,
  },
});
