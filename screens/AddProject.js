import ProjectForm from "../components/Projects/ProjectForm";
import { insertProject } from "../util/database";

function AddProject({ navigation }) {
  async function createProjectHandler(project) {
    await insertProject(project);
    navigation.navigate("AllProjects");
  }

  return <ProjectForm onCreateProject={createProjectHandler} />;
}

export default AddProject;
