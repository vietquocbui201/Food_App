import React, { createContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../themes/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { AllRestaurants, Basket, MoreDishes, Favorites } from "../screen";
import LoginNavigation from "./LoginNavigation";
import HomeStackNavigation from "./HomeStackNavigation";
//import { routes } from "./routes";
import Profile from "../screen/Profile";
import { routes } from "./routes";

export const UserContext = createContext();
const Tab = createBottomTabNavigator();
const HomeNavigation = ({ navigation, route }) => {
  const { user_id } = route.params;
  const [userId, setUserId] = useState(user_id);
  return (
    <UserContext.Provider value={userId}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: colors.ORANGE,
          tabBarInactiveTintColor: colors.DARKGRAY,
        }}
      >
        <Tab.Screen
          name={routes.HOMETAB}
          component={HomeStackNavigation}
          initialParams={{ user_id }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="storefront" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={routes.AllRESTAURANTS}
          component={AllRestaurants}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="compass" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={routes.BASKET}
          component={Basket}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="basket" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={routes.FAVORITES}
          component={Favorites}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="heart-circle" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={routes.PROFILETAB}
          component={Profile}
          initialParams={{ user_id }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="account-circle" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </UserContext.Provider>
  );
};

export default HomeNavigation;