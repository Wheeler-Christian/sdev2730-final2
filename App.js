import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";

import AllProjects from "./screens/AllProjects";
import AddProject from "./screens/AddProject";
import Map from "./screens/Map";
import ProjectDetails from "./screens/ProjectDetails";

import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import { useEffect, useState } from "react";
import { init } from "./util/database";

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState();

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllProjects"
            component={AllProjects}
            options={({ navigation }) => ({
              title: "Your Projects",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddProject")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddProject"
            component={AddProject}
            options={{
              title: "Add a new Project",
            }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="ProjectDetails"
            component={ProjectDetails}
            options={{
              title: "Loading Project...",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
