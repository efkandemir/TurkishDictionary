import { View, Button, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './DetailsScreen';


const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
    return (
        <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-blue-600 font-semibold text-lg"
                onPress={() => navigation.navigate('Detail')}
            >Go to Details</Text>
        </View>
    );
}

export default function HomeStack() {
    return (
        <Stack.Navigator>
            {/* HomeScreen'de başlık gizleniyor */}
            <Stack.Screen
                name="Search"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            {/* DetailsScreen için başlık gösteriliyor */}
            <Stack.Screen
                name="Detail"
                component={DetailsScreen}
                options={{ title: 'Detail' }}
            />
        </Stack.Navigator>
    );
}
