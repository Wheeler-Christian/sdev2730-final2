import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Project, ProjectStatus } from "../../models/project";
import Button from "../UI/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

function ProjectForm({ onCreateProject }) {
  const [titleState, setTitleState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitleHandler(enteredText) {
    setTitleState(enteredText);
  }

  function changeDescriptionHandler(newDescription) {
    setDescriptionState(newDescription);
  }

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
      ProjectStatus.indexOf("Suggested"),
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
          multiline={true}
          onChangeText={changeDescriptionHandler}
          value={descriptionState}
        />
      </View>
      <Text style={styles.label}>Image of Project Site</Text>
      <ImagePicker imageInput={null} onTakeImage={takeImageHandler} />
      <Text style={styles.label}>Location of Project</Text>
      <LocationPicker onPickLocation={pickLocationHandler} />
      <View style={styles.button}>
        <Button
          onPress={saveProjectHandler}
          bgColor={Colors.bgButton}
        >
          Add Project
        </Button>
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
    color: Colors.cMain,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.bgBorder,
    borderBottomWidth: 2,
    backgroundColor: Colors.bgTextInput,
    color: Colors.cMainLighter,
  },
  radioGroup: {},
  rbContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    paddingTop: 24,
    paddingBottom: 60,
  },
});
