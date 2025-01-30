import { View, Button, Text, Image } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './DetailsScreen';
import SearchBox from '../components/searchBox';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-blue-600 font-semibold text-lg"
                onPress={() => navigation.navigate('Detail')}
            >Go to Details</Text>
            <Image source={require('../assets/tdks.png')}
                className="w-[85px] h-[40px]" // Boyutlar Tailwind ile
                style={{ tintColor: 'red' }} // Renk için manuel olarak ekle
            />
            <SearchBox place="" />
        </View>

    );
}

export default function HomeStack() {
    return (
        <Stack.Navigator>
            {/* HomeScreen'de başlık gizleniyor */}
            <Stack.Screen
                name="MainSearch"
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
