import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import ProjectItem from "./ProjectItem";

function ProjectsList({ projects }) {
  const navigation = useNavigation();

  function selectedProjectHandler(id) {
    navigation.navigate("ProjectDetails", {
      projectId: id,
    });
  }

  if (!projects || projects.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No projects added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={projects}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProjectItem project={item} onSelect={selectedProjectHandler} />
      )}
    />
  );
}

export default ProjectsList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.cMain,
  },
});
