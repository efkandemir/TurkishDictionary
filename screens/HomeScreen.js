import { View, StatusBar, Pressable, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './DetailsScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import SuggestionCard from '../components/suggestionCard';
import SearchHistoryList from '../components/searchHistoryList';
import HomeSearchAnimated from '../components/homeSearchAnimated';

const Stack = createNativeStackNavigator();
function HomeScreen({ navigation }) {
    const [isSearchFocus, setSearchFocus] = useState(false);
    const [homeData, setHomeData] = useState(null)

    const getHomeData = async () => {
        try {
            const response = await fetch("https://sozluk.gov.tr/icerik");
            const data = await response.json()
            setHomeData(data);
        } catch (error) {
            console.error("Hata oluştu:", error);
        }
    };
    useEffect(() => {
        getHomeData();
    }, []);


    useFocusEffect(
        React.useCallback(() => {
            if (Platform.OS === 'android') {
                StatusBar.setBackgroundColor(isSearchFocus ? 'white' : '#E11E3C');
            }
            StatusBar.setBarStyle(isSearchFocus ? 'dark-content' : 'light-content');
        }, [isSearchFocus])
    );

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
            description: "Efkan 1"
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
            description: "Efkan 2"
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
            description: "Efkan 3"
        }
    ];

    return (
        <SafeAreaView className={`flex-1 ${isSearchFocus ? "bg-softRed" : "bg-red"}`}>
            <HomeSearchAnimated isSearchFocus={isSearchFocus} onSearchFocus={setSearchFocus} />

            {/* İçerik */}
            <View className={`flex-1 bg-softRed -z-10 ${isSearchFocus ? "pt-0" : "pt-[26px]"}`}>
                {isSearchFocus ? (
                    <View className="flex-1 ">
                        <SearchHistoryList data={DATA} />
                    </View>
                ) : (
                    <View className="flex-1 px-6 py-10">
                        <SuggestionCard
                            data={homeData?.kelime[0]}
                            title="Bir Kelime"
                            onPress={() => navigation.navigate('Detail', { keyword: homeData?.kelime[0].madde })}
                        />
                        <SuggestionCard
                            mt={40}
                            data={homeData?.atasoz[0]}
                            title="Bir Deyim-Atasözü"
                            onPress={() => navigation.navigate('Detail', { keyword: homeData?.atasoz[0].madde })}
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainSearch" component={HomeScreen}
                options={() => {
                    return {
                        headerShown: false
                    }
                }} />
            <Stack.Screen
                name="Detail"
                component={DetailsScreen}
                options={({ route, navigation }) => ({
                    title: route.params?.title,
                    headerStyle: {
                        backgroundColor: '#F8F8F8', // Header arka plan rengi
                        shadowColor: 'transparent'  // iOS için gölgeyi kaldırma
                    },
                    headerTintColor: '#333', // Geri butonu ve başlık rengi
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Pressable className="bg-#F8F8F8 px-5 h-12 justify-center ml-[-5px]" onPress={() => navigation.goBack()}>
                            <Entypo name="chevron-left" size={24} color="black" />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable className="bg-#F8F8F8 px-5 h-12 justify-center " onPress={() => navigation.goBack()}>
                            <Feather name="more-horizontal" size={24} color="black" />
                        </Pressable>
                    )
                })}
            />
        </Stack.Navigator>
    );
}
