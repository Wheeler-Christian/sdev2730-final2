import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Project, ProjectStatus } from "../../models/project";
import { RadioButton } from "react-native-paper";
import Button from "../UI/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

function ProjectForm({ onCreateProject }) {
  const [titleState, setTitleState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [projectStatusState, setProjectStatusState] = useState(0);
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitleHandler(enteredText) {
    setTitleState(enteredText);
  }

  function changeDescriptionHandler(newDescription) {
    setDescriptionState(newDescription);
  }

  // function changeStatusHandler(newStatus) {
  //   setProjectStatusState(newStatus);
  // }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function saveProjectHandler() {
    const projectData = new Project(
      titleState,
      descriptionState,
      projectStatusState,
      selectedImage,
      pickedLocation
    );
    onCreateProject(projectData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={titleState}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeDescriptionHandler}
          value={descriptionState}
        />
        <Text style={styles.label}>Project Status</Text>
        <View style={styles.radioGroup}>
          <View style={styles.rbContainer}>
            <RadioButton
              value={0}
              status={projectStatusState === 0 ? "checked" : "unchecked"}
              onPress={() => setProjectStatusState(0)}
            />
            <Text style={styles.rbText}>{"suggested"}</Text>
          </View>

          <View style={styles.rbContainer}>
            <RadioButton
              value={1}
              status={projectStatusState === 1 ? "checked" : "unchecked"}
              onPress={() => setProjectStatusState(1)}
            />
            <Text style={styles.rbText}>{"started"}</Text>
          </View>

          <View style={styles.rbContainer}>
            <RadioButton
              value={2}
              status={projectStatusState === 2 ? "checked" : "unchecked"}
              onPress={() => setProjectStatusState(2)}
            />
            <Text style={styles.rbText}>{"completed"}</Text>
          </View>

          <View style={styles.rbContainer}>
            <RadioButton
              value={3}
              status={projectStatusState === 3 ? "checked" : "unchecked"}
              onPress={() => setProjectStatusState(3)}
            />
            <Text style={styles.rbText}>{"rejected"}</Text>
          </View>

          <View style={styles.rbContainer}>
            <RadioButton
              value={4}
              status={projectStatusState === 4 ? "checked" : "unchecked"}
              onPress={() => setProjectStatusState(4)}
            />
            <Text style={styles.rbText}>{"abandoned"}</Text>
          </View>
        </View>
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <View style={styles.button}>
        <Button onPress={saveProjectHandler}>Add Project</Button>
      </View>
    </ScrollView>
  );
}

export default ProjectForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
  radioGroup: {},
  rbContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rbText: {
    color: Colors.primary500,
  },
  button: {
    paddingTop: 24,
    paddingBottom: 60,
  },
});
