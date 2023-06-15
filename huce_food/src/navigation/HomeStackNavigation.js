import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { routes } from "./routes";
import { Home, Detail, MoreDishes } from "../screen";
const Stack = createNativeStackNavigator();
const HomeStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.HOME} component={Home} />
      <Stack.Screen name={routes.MOREDISHES} component={MoreDishes} />
      <Stack.Screen name={routes.DETAIL} component={Detail} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;
