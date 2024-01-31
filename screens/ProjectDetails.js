import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchProjectDetails } from "../util/database";

function ProjectDetails({ route, navigation }) {
  const [fetchedProject, setFetchedProject] = useState();

  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedProject.location.lat,
      initialLng: fetchedProject.location.lng,
    });
  }

  const selectedProjectId = route.params.projectId;

  useEffect(() => {
    async function loadProjectData() {
      const project = await fetchProjectDetails(selectedProjectId);
      setFetchedProject(project);
      navigation.setOptions({
        title: project.title,
      });
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
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedProject.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
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
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
