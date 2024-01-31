import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

function RadioButton({ id, whichRB, deselectOthers }) {
  const [selectedState, setSelectedState] = useState(
    () => id === whichRB
  );
  let bgColor = selectedState ? styles.selected : styles.deselected;

  useEffect(() => {
    bgColor = selectedState ? styles.selected : styles.deselected;
  }, [selectedState]);

  function toggleSelected() {
    setSelectedState(!selectedState);
  }

  function deselectMe() {
    setSelectedState(false);
  }

  return (
    <Pressable onPress={toggleSelected}>
      <View style={[styles.radioButton, bgColor]}></View>
    </Pressable>
  );
}

export default RadioButton;

const styles = StyleSheet.create({
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    backgroundColor: "black",
  },
  deselected: {
    backgroundColor: "white",
  },
});
