import { Alert } from "react-native";

import ProjectForm from "../components/Projects/ProjectForm";
import { updateProject } from "../util/database";

function EditProject({ navigation, route }) {
  const currentProject = route.params.project;

  async function editProjectHandler(project) {
    await updateProject(project);
    navigation.popToTop();
    Alert.alert("Success", "Successfully updated the project");
  }

  return (
    <ProjectForm
      isEditing={true}
      project={currentProject}
      onSubmitForm={editProjectHandler}
    />
  );
}

export default EditProject;
