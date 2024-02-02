import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { Colors } from "../../constants/colors";

function RadioGroup({ rbState, setRbState }) {
  return (
    <View style={styles.radioGroup}>
      <View style={styles.rbContainer}>
        <RadioButton
          value={0}
          status={rbState === 0 ? "checked" : "unchecked"}
          onPress={() => setRbState(0)}
        />
        <Text style={styles.rbText}>{"suggested"}</Text>
      </View>

      <View style={styles.rbContainer}>
        <RadioButton
          value={1}
          status={rbState === 1 ? "checked" : "unchecked"}
          onPress={() => setRbState(1)}
        />
        <Text style={styles.rbText}>{"started"}</Text>
      </View>

      <View style={styles.rbContainer}>
        <RadioButton
          value={2}
          status={rbState === 2 ? "checked" : "unchecked"}
          onPress={() => setRbState(2)}
        />
        <Text style={styles.rbText}>{"completed"}</Text>
      </View>

      <View style={styles.rbContainer}>
        <RadioButton
          value={3}
          status={rbState === 3 ? "checked" : "unchecked"}
          onPress={() => setRbState(3)}
        />
        <Text style={styles.rbText}>{"rejected"}</Text>
      </View>

      <View style={styles.rbContainer}>
        <RadioButton
          value={4}
          status={rbState === 4 ? "checked" : "unchecked"}
          onPress={() => setRbState(4)}
        />
        <Text style={styles.rbText}>{"abandoned"}</Text>
      </View>
    </View>
  );
}

export default RadioGroup;

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
