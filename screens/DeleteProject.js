import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import OutlinedButton from "../components/UI/OutlinedButton";
import { deleteProjectQuery } from "../util/database";

function DeleteProject({ navigation, route }) {
  const project = route.params.project;

  function goBackHandler() {
    navigation.pop();
  }

  async function confirmDeleteHandler() {
    const result = await deleteProjectQuery(project.id);
    navigation.popToTop();
    Alert.alert(
      "Success",
      `Successfully deleted the project "${project.title}"`
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.h1}>
        Are you sure you want to delete this project?
      </Text>
      <View style={styles.details}>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.address}>{project.address}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <OutlinedButton
          icon="arrow-back-outline"
          myColor={Colors.accent500}
          onPress={goBackHandler}
        >
          No, go back
        </OutlinedButton>
        <OutlinedButton
          icon={"trash"}
          myColor={Colors.confirm500}
          onPress={confirmDeleteHandler}
        >
          Confirm deletion
        </OutlinedButton>
      </View>
    </View>
  );
}

export default DeleteProject;

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 30,
  },
  h1: {
    marginVertical: 30,
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  details: {
    borderColor: Colors.primary500,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  title: {
    color: Colors.primary500,
    fontWeight: "bold",
    fontSize: 22,
  },
  address: {
    color: Colors.primary500,
    fontSize: 18,
  },
  buttonsContainer: {
    marginVertical: 25,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
