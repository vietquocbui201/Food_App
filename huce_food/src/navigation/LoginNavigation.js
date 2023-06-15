import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Login,
  SignUp,
  Wellcome,
  Home,
  AllRestaurants,
  MoreDishes,
  CustomerOder,
} from "../screen";
import HomeNavigation from "./HomeNavigation";
import { routes } from "./routes";

const Stack = createNativeStackNavigator();

const LoginNavigation = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return <Wellcome />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={routes.LOGIN} component={Login} />
        <Stack.Screen name={routes.SIGNUP} component={SignUp} />
        <Stack.Screen name={routes.HOMETAB} component={HomeNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigation;
