import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { ProjectStatus } from "../models/project";
import { FavoritesContext } from "../store/context/favorites-context";
import { fetchProjectDetails } from "../util/database";

function ProjectDetails({ route, navigation }) {
  const favoriteProjectsCtx = useContext(FavoritesContext);

  const selectedProjectId = route.params.projectId;
  const [fetchedProject, setFetchedProject] = useState();

  const projectIsFavorite = favoriteProjectsCtx.ids.includes(selectedProjectId);

  function toggleFavoriteHandler() {
    console.log(favoriteProjectsCtx.ids);
    if (projectIsFavorite) {
      favoriteProjectsCtx.removeFavorite(selectedProjectId);
    } else {
      favoriteProjectsCtx.addFavorite(selectedProjectId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Project Details",
      headerRight: () => {
        return (
          <IconButton
            icon={projectIsFavorite ? "star" : "star-outline"}
            size={24}
            color={Colors.cNavHeader}
            onPress={toggleFavoriteHandler}
          />
        );
      },
    });
  }, [navigation, toggleFavoriteHandler]);

  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedProject.location.lat,
      initialLng: fetchedProject.location.lng,
    });
  }

  function editProjectHandler() {
    navigation.navigate("EditProject", { project: fetchedProject });
  }

  function deleteProjectHandler() {
    navigation.navigate("DeleteProject", { project: fetchedProject });
  }

  useEffect(() => {
    async function loadProjectData() {
      const project = await fetchProjectDetails(selectedProjectId);
      setFetchedProject(project);
    }

    loadProjectData();
  }, [selectedProjectId]);

  if (!fetchedProject) {
    return (
      <View style={styles.fallback}>
        <Text>Loading project data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedProject.imageUri }} />
      <View style={styles.textContainer}>
        <Text style={styles.h1}>{fetchedProject.title}</Text>
        <Text style={styles.h2}>
          {ProjectStatus[fetchedProject.status]} Status
        </Text>
        <Text style={styles.text}>{fetchedProject.description}</Text>
        <Text style={[styles.text, styles.bold]}>{fetchedProject.address}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <OutlinedButton
          icon="map"
          color={Colors.cMain}
          onPress={showOnMapHandler}
        >
          View on Map
        </OutlinedButton>
      </View>
      <View style={styles.buttonContainer}>
        <OutlinedButton
          icon="pencil"
          color={Colors.cMain}
          onPress={editProjectHandler}
        >
          Edit Project
        </OutlinedButton>
      </View>
      <View style={styles.buttonContainer}>
        <OutlinedButton
          icon="trash"
          color={Colors.cMain}
          onPress={deleteProjectHandler}
        >
          Delete Project
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default ProjectDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    color: Colors.cMain,
    marginVertical: 3,
    fontSize: 24,
    fontWeight: "bold",
  },
  h2: {
    color: Colors.cMain,
    marginVertical: 3,
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  text: {
    color: Colors.cMain,
    textAlign: "left",
    fontSize: 16,
    marginVertical: 3,
  },
  bold: {
    fontWeight: "bold",
  },
  buttonContainer: {
    margin: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
