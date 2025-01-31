import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import HomeScreen from "./screens/HomeScreen"; // HomeStack olarak güncelledik
import SplashScreen from "./screens/SplashScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HistoryScreen from "./screens/HistoryScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import TabBar from "./components/tab-bar"

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      initialRouteName="Search"
      tabBar={(props) => <TabBar {...props} />} // Özel TabBar'ı burada tanımlıyoruz
    >
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Search" component={HomeScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
