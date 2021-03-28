import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Home from "../screens/Home";
import Favorites from "../screens/Favorites";
import {
  BottomTabParamList,
  FavoritesParamList,
  HomeParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritesNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-star" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerTitle: "Translate",
          headerStyle: { backgroundColor: "#1890ff" },
          headerTintColor: "#fff",
        }}
      />
    </HomeStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<FavoritesParamList>();

function FavoritesNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="FavoritesScreen"
        component={Favorites}
        options={{
          headerTitle: "Favorites",
          headerStyle: { backgroundColor: "#1890ff" },
          headerTintColor: "#fff",
        }}
      />
    </TabTwoStack.Navigator>
  );
}
