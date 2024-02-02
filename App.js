import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";

import AllProjects from "./screens/AllProjects";
import AddProject from "./screens/AddProject";
import DeleteProject from "./screens/DeleteProject";
import EditProject from "./screens/EditProject";
import Favorites from "./screens/Favorites";
import Map from "./screens/Map";
import ProjectDetails from "./screens/ProjectDetails";

import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import { useEffect, useState } from "react";
import { init } from "./util/database";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.gray700,
        sceneContainerStyle: { backgroundColor: Colors.gray700 },
        drawerContentStyle: { backgroundColor: Colors.primary700 },
        drawerInactiveTintColor: "#eee",
        drawerActiveTintColor: "black",
        drawerActiveBackgroundColor: Colors.primary100,
      }}
    >
      <Drawer.Screen
        name="AllProjects"
        component={AllProjects}
        options={({ navigation }) => ({
          title: "City Planner -- Projects",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
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
      <Drawer.Screen
        name="Favorites"
        component={Favorites}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

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
            name="DrawerScreen"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddProject"
            component={AddProject}
            options={{
              title: "Add a new Project",
            }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
          <Stack.Screen
            name="EditProject"
            component={EditProject}
            options={{
              title: "Edit Project",
            }}
          />
          <Stack.Screen
            name="DeleteProject"
            component={DeleteProject}
            options={{
              title: "Delete Project",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
