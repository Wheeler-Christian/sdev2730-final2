import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import ProjectsList from "../components/Projects/ProjectsList";
import { fetchProjects } from "../util/database";

function AllProjects({ route }) {
  const [loadedProjects, setLoadedProjects] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadedProjects() {
      const projects = await fetchProjects();
      setLoadedProjects(projects);
    }

    if (isFocused) {
      loadedProjects();
      // setLoadedProjects((curProjects) => [...curProjects, route.params.project]);
    }
  }, [isFocused]);

  return <ProjectsList projects={loadedProjects} />;
}

export default AllProjects;
