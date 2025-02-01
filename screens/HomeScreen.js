import { View, Text, Image, ImageBackground, StatusBar, Platform, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './DetailsScreen';
import SearchBox from '../components/searchBox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
    const [isSearchFocus, setSearchFocus] = useState(false);
    const heroHeight = useState(new Animated.Value(285))[0];

    useEffect(() => {
        if (isSearchFocus) {
            Animated.timing(heroHeight, {
                toValue: 95, // Odaklanınca yukarı kaydır, çıkınca eski haline getir
                duration: 230, // 0.5 saniyede animasyon
                useNativeDriver: false
            }).start();
        }
        else {
            Animated.timing(heroHeight, {
                toValue: 285, // Odaklanınca yukarı kaydır, çıkınca eski haline getir
                duration: 230, // 0.5 saniyede animasyon
                useNativeDriver: false
            }).start();
        }

    }, [isSearchFocus]);

    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBackgroundColor(isSearchFocus ? 'white' : '#E11E3C');
            StatusBar.setBarStyle(isSearchFocus ? 'dark-content' : 'light-content');
        }, [isSearchFocus])
    );

    return (
        <SafeAreaView className={`flex-1 ${isSearchFocus ? "bg-softRed" : "bg-red"}`}>

            {/* Arama kutusu odaklandığında yukarı kayma efekti */}
            <Animated.View style={{ height: heroHeight }}>
                {
                    !isSearchFocus && (
                        <ImageBackground source={require('../assets/bg.jpg')} className="w-full h-full">
                            <View className="flex-1 justify-center items-center">
                                <Image
                                    source={require('../assets/tdks.png')}
                                    className="w-[85px] h-[40px]"
                                    style={{ tintColor: 'white' }}
                                />
                            </View>

                        </ImageBackground>
                    )
                }


                <View className={`p-4  w-full absolute left-0 ${isSearchFocus ? "bottom-0" : "bottom-[-42px]"}`}>
                    <SearchBox place="" onChangeFocus={(status) => setSearchFocus(status)} />
                </View>
            </Animated.View>

            {/* İçerik */}
            <View className={`flex-1 bg-white -z-10 ${isSearchFocus ? "pt-0" : "pt-[26px]"}`}>
                {isSearchFocus ? (
                    <View className="flex-1 p-[30px]">
                        <Text>History</Text>
                    </View>
                ) : (
                    <View className="flex-1 p-[30px]">
                        <Text>Öneri</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainSearch" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={DetailsScreen} options={{ title: 'Detail' }} />
        </Stack.Navigator>
    );
}
