import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Button from "../components/UI/Button";
import ImagePicker from "../components/Projects/ImagePicker";
import RadioGroup from "../components/UI/RadioGroup";
import { Colors } from "../constants/colors";
import { updateProject } from "../util/database";

function EditProject({ navigation, route }) {
  const currentProject = route.params.project;

  // vvvvv State vvvvv
  const [titleState, setTitleState] = useState(currentProject.title);
  const [descriptionState, setDescriptionState] = useState(
    currentProject.description
  );
  const [projectStatusState, setProjectStatusState] = useState(
    currentProject.status
  );
  const [imageUriState, setImageUriState] = useState(currentProject.imageUri);
  // ^^^^^ State ^^^^^

  // vvvvv Handlers vvvvv
  function changeTitleHandler(newTitle) {
    setTitleState(newTitle);
  }

  function changeDescriptionHandler(newDescription) {
    setDescriptionState(newDescription);
  }

  function changeStatusHandler(newStatus) {
    setProjectStatusState(newStatus);
  }

  function changeImageHandler(newImageUri) {
    setImageUriState(newImageUri);
  }

  async function saveChangesHandler() {
    await updateProject({
      ...currentProject,
      title: titleState,
      description: descriptionState,
      status: projectStatusState,
      imageUri: imageUriState,
    });
    navigation.popToTop();
    Alert.alert("Success", "Successfully updated the project");
  }
  // ^^^^^ Handlers ^^^^^

  return (
    <ScrollView style={styles.form}>
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
      <Text style={styles.label}>Project Status</Text>
      <RadioGroup
        rbState={projectStatusState}
        setRbState={changeStatusHandler}
      />
      <Text style={styles.label}>Image</Text>
      <ImagePicker
        imageInput={imageUriState}
        onTakeImage={changeImageHandler}
      />
      <View style={styles.button}>
        <Button onPress={saveChangesHandler} bgColor={Colors.bgButton}>
          Save Changes
        </Button>
      </View>
    </ScrollView>
  );
}

export default EditProject;

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
  rbText: {
    color: Colors.primary500,
  },
  button: {
    paddingTop: 24,
    paddingBottom: 60,
  },
});
