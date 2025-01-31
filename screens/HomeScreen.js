import { View, Button, Text, Image, ImageBackground, StatusBar, Platform } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './DetailsScreen';
import SearchBox from '../components/searchBox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
    const [isSearchFocus, setSearchFocus] = useState(false)
    useFocusEffect(React.useCallback(() => {
        StatusBar.setBarStyle('light-content');
        Platform.OS === 'android' && StatusBar.setBackgroundColor('#E11E3C')
    }, [])
    )
    return (
        <SafeAreaView className="flex-1">
            <StatusBar barStyle="light-content" backgroundColor="#E11E3C" />
            <View className="relative h-[285px]">
                <ImageBackground source={require('../assets/bg.jpg')} className="w-full h-full">
                    <View className="flex-1 justify-center items-center">
                        <Image source={require('../assets/tdks.png')}
                            className="w-[85px] h-[40px] " // Boyutlar Tailwind ile
                            style={{ tintColor: 'white' }} // Renk için manuel olarak ekle
                        />
                    </View>
                    <View className="p-4 mb-[-42px] w-full" >
                        <SearchBox place="" onChangeFocus={status=>setSearchFocus(status)}/>
                    </View>

                </ImageBackground>
            </View>


            <View className="flex-1 bg-white -z-10 pt-[26px]">
                <View className="flex-1 p-[30px]">
                    <Text>Hello</Text>
                </View>

            </View>
        </SafeAreaView>
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
