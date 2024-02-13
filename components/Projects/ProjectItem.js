import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { ProjectStatus } from "../../models/project";

function ProjectItem({ project, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, project.id)}
    >
      <Image style={styles.image} source={{ uri: project.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.status}>
          {ProjectStatus[project.status]} Status
        </Text>
        <Text style={styles.address}>{project.address}</Text>
      </View>
    </Pressable>
  );
}

export default ProjectItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.bgCard,
    elevation: 2,
    shadowColor: "white",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.cCard,
  },
  status: {
    fontWeight: "bold",
    fontSize: 14,
    color: Colors.cCard,
  },
  address: {
    fontSize: 12,
    color: Colors.cCard,
  },
});
