import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import RadioButton from "./RadioButton";

function RBView() {
  let idSelected = 0;

  return (
    <View>
      <RadioButton id={0} whichRB={idSelected} />
      <RadioButton id={1} whichRB={idSelected} />
      <RadioButton id={2} whichRB={idSelected} />
      <RadioButton id={-1} whichRB={idSelected} />
      <RadioButton id={-2} whichRB={idSelected} />
    </View>
  );
}

export default RBView;
